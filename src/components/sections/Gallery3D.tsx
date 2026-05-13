import { useRef, useState, useMemo, useEffect, Suspense, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { portfolioItems, type PortfolioItem } from '../../data/portfolio'
import { MobileControls } from '../ui/MobileControls'
import { useTheme } from '../../hooks/useTheme'

// ---- Constants ----
const HALLWAY_WIDTH = 8
const HALLWAY_HEIGHT = 5
const FRAME_SPACING = 6
const FRAME_WIDTH = 3.5
const FRAME_HEIGHT = 2.5
const FRAME_Y = 1.8
const MOVE_SPEED = 5
const MOUSE_SENSITIVITY = 0.002
const TOUCH_SENSITIVITY = 0.004

// ---- Theme-aware gallery palettes ----
// Two complete environments. Dark is the original cyberpunk-violet hallway.
// Light is the "Foundation cold sunrise" / Apple-store-meets-sci-fi
// counterpart — ivory walls, polished grey-violet floor, deep gunmetal
// frames, cyan point-light accents that read sci-fi without violet muddying
// on the light bg. Toggling between them at runtime swaps materials, lights,
// scene bg, fog, and the procedural canvas textures.
interface GalleryPalette {
  sceneBg: string
  fogNear: number
  fogFar: number
  wall: string
  floor: string
  ceiling: string
  frameBorder: string
  frameMetalness: number
  ambientIntensity: number
  hemiSky: string
  hemiGround: string
  hemiIntensity: number
  frameLight: string
  frameEmissiveIntensity: number
  placard: string
  title: string
  subtitle: string
  ceilingStrip: string
  ceilingStripIntensity: number
  ceilingPointColor: string
  ceilingPointIntensity: number
  floorAccentColor: string
  endWall: string
  // Procedural-texture colors. Kept as RGB tuples so the canvas helpers
  // can blend them into the speckle/gradient passes without re-parsing.
  textureHighlightR: number
  textureHighlightG: number
  textureHighlightB: number
  textureLine: string
  textureGradientTop: string
  textureGradientBottom: string
}

const DARK_GALLERY_PALETTE: GalleryPalette = {
  sceneBg: '#0a0a15',
  fogNear: 15,
  fogFar: 80,
  wall: '#252540',
  floor: '#1e1e32',
  ceiling: '#1a1a2e',
  frameBorder: '#0f0f1a',
  frameMetalness: 0.3,
  ambientIntensity: 0.4,
  hemiSky: '#b1c8ff',
  hemiGround: '#1a1a2e',
  hemiIntensity: 0.3,
  frameLight: '#6366f1',
  frameEmissiveIntensity: 1.2,
  placard: '#0f0f1a',
  title: '#d4d4e0',
  subtitle: '#9090a8',
  ceilingStrip: '#ffffff',
  ceilingStripIntensity: 1.2,
  ceilingPointColor: '#e8e8ff',
  ceilingPointIntensity: 2.0,
  floorAccentColor: '#6366f1',
  endWall: '#151528',
  textureHighlightR: 100,
  textureHighlightG: 100,
  textureHighlightB: 140,
  textureLine: 'rgba(100, 100, 140, 0.25)',
  textureGradientTop: 'rgba(100, 100, 160, 0.08)',
  textureGradientBottom: 'rgba(0, 0, 20, 0.15)',
}

const LIGHT_GALLERY_PALETTE: GalleryPalette = {
  sceneBg: '#f4f1f8',
  fogNear: 18,
  fogFar: 55,
  wall: '#e4deee',
  floor: '#c8c0d8',
  ceiling: '#f4f1f8',
  frameBorder: '#2a2138',
  frameMetalness: 0.5,
  ambientIntensity: 0.65,
  hemiSky: '#ffffff',
  hemiGround: '#c8c0d8',
  hemiIntensity: 0.45,
  frameLight: '#06b6d4',
  frameEmissiveIntensity: 0.8,
  placard: '#ffffff',
  title: '#2a2138',
  subtitle: '#5a5070',
  // Ceiling strips in light mode: warm white still glows (LED-bar feel),
  // but the brightness is dialed back since the bg is no longer absorbing
  // light. Same for the point lights.
  ceilingStrip: '#ffffff',
  ceilingStripIntensity: 0.7,
  ceilingPointColor: '#f0f4ff',
  ceilingPointIntensity: 1.0,
  // Floor accents: cyan instead of violet, faint — adds the sci-fi tell
  // without competing with the cyan-shifted frame lights.
  floorAccentColor: '#06b6d4',
  endWall: '#dfd8e8',
  // Texture speckle: muted violet on ivory (subtle, just enough to break
  // up flat planes); line/gradient values shifted to read on light bg.
  textureHighlightR: 90,
  textureHighlightG: 80,
  textureHighlightB: 130,
  textureLine: 'rgba(90, 80, 130, 0.15)',
  textureGradientTop: 'rgba(255, 255, 255, 0.18)',
  textureGradientBottom: 'rgba(120, 100, 160, 0.12)',
}

function useGalleryPalette(): GalleryPalette {
  const { theme } = useTheme()
  return theme === 'light' ? LIGHT_GALLERY_PALETTE : DARK_GALLERY_PALETTE
}

// Shared mutable state for per-frame crosshair targeting (avoids React re-renders)
const fpsState = {
  aimedItemId: null as string | null,
}

// ---- PortraitFrame ----
function PortraitFrame({
  item,
  position,
  side,
}: {
  item: PortfolioItem
  position: [number, number, number]
  side: 'left' | 'right'
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, item.images[0])
  const palette = useGalleryPalette()

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
    }
  }, [texture])

  const aspect = useMemo(() => {
    if (texture.image) return texture.image.width / texture.image.height
    return FRAME_WIDTH / FRAME_HEIGHT
  }, [texture])

  const frameW = Math.min(FRAME_WIDTH, FRAME_HEIGHT * aspect)
  const frameH = frameW / aspect
  const rotationY = side === 'left' ? Math.PI / 2 : -Math.PI / 2

  useFrame(() => {
    if (meshRef.current) {
      const isAimed = fpsState.aimedItemId === item.id
      const targetEmissive = isAimed ? 0.3 : 0.12
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.1
      }
    }
  })

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Frame border */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[frameW + 0.3, frameH + 0.3, 0.08]} />
        <meshStandardMaterial color={palette.frameBorder} metalness={palette.frameMetalness} roughness={0.7} />
      </mesh>

      {/* Artwork - tagged with userData for raycasting */}
      <mesh ref={meshRef} position={[0, 0, 0]} userData={{ portfolioItem: item }}>
        <planeGeometry args={[frameW, frameH]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color('#ffffff')}
          emissiveIntensity={0.12}
          emissiveMap={texture}
          toneMapped={false}
        />
      </mesh>

      {/* Label placard background */}
      <mesh position={[0, -(frameH / 2) - 0.4, -0.01]}>
        <planeGeometry args={[Math.min(frameW + 0.2, 3.0), 0.32]} />
        <meshBasicMaterial color={palette.placard} transparent opacity={0.85} />
      </mesh>
      {/* Title - single line, small */}
      <Text
        position={[0, -(frameH / 2) - 0.3, 0.01]}
        fontSize={0.09}
        color={palette.title}
        anchorX="center"
        anchorY="top"
        maxWidth={Math.min(frameW, 2.8)}
        overflowWrap="break-word"
        whiteSpace="nowrap"
      >
        {item.title.length > 30 ? item.title.slice(0, 28) + '...' : item.title}
      </Text>
      {/* Client name */}
      <Text
        position={[0, -(frameH / 2) - 0.46, 0.01]}
        fontSize={0.065}
        color={palette.subtitle}
        anchorX="center"
        anchorY="top"
        maxWidth={Math.min(frameW, 2.8)}
        whiteSpace="nowrap"
      >
        {item.client}
      </Text>

      {/* Per-artwork gallery spotlight. Tinted by the frame-light color so
          dark mode reads violet-cool and light mode reads cyan-cool. */}
      <pointLight position={[0, 0.8, 1.5]} intensity={2.0} distance={5} color={palette.frameLight} />
      <pointLight position={[0, -1.5, 0.5]} intensity={0.5} distance={3} color="#ffffff" />
    </group>
  )
}

// ---- Procedural Texture Generators ----
// All three now take a `palette` arg so they re-render against the active
// theme. The speckle/gradient/line passes still produce the same general
// detail look — only their hue + lightness shift between modes. Callers
// must dispose the returned texture when switching themes (see Hallway's
// useMemo + useEffect cleanup) to avoid GPU leaks.
function createFloorTexture(length: number, palette: GalleryPalette): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = palette.floor
  ctx.fillRect(0, 0, 512, 512)

  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const brightness = Math.random() * 15 + 20
    ctx.fillStyle = `rgba(${brightness + palette.textureHighlightR}, ${brightness + palette.textureHighlightG}, ${brightness + palette.textureHighlightB}, 0.15)`
    ctx.fillRect(x, y, 2, 2)
  }

  ctx.strokeStyle = palette.textureLine
  ctx.lineWidth = 2
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 512)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(512, i)
    ctx.stroke()
  }

  ctx.strokeStyle = palette.textureLine
  ctx.lineWidth = 1
  for (let i = 0; i <= 512; i += 64) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 512)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(512, i)
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, length / 4)
  return tex
}

function createWallTexture(length: number, palette: GalleryPalette): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = palette.wall
  ctx.fillRect(0, 0, 512, 256)

  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, palette.textureGradientTop)
  grad.addColorStop(1, palette.textureGradientBottom)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 256
    const brightness = Math.random() * 20 + 30
    ctx.fillStyle = `rgba(${brightness + palette.textureHighlightR - 40}, ${brightness + palette.textureHighlightG - 40}, ${brightness + palette.textureHighlightB - 40}, 0.08)`
    ctx.fillRect(x, y, 1, 1)
  }

  ctx.strokeStyle = palette.textureLine
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 200)
  ctx.lineTo(512, 200)
  ctx.stroke()

  ctx.strokeStyle = palette.textureLine
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 256)
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(length / 8, 1)
  return tex
}

function createCeilingTexture(length: number, palette: GalleryPalette): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = palette.ceiling
  ctx.fillRect(0, 0, 256, 256)

  ctx.strokeStyle = palette.textureLine
  ctx.lineWidth = 2
  for (let i = 0; i <= 256; i += 64) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 256)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(256, i)
    ctx.stroke()
  }

  ctx.fillStyle = palette.textureGradientBottom
  for (let x = 8; x < 256; x += 16) {
    for (let y = 8; y < 256; y += 16) {
      if ((x + y) % 32 === 8) {
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, length / 8)
  return tex
}

// ---- Hallway Structure ----
function Hallway({ length }: { length: number }) {
  const palette = useGalleryPalette()
  // Textures regenerate when length OR theme changes; we dispose the prior
  // texture instances on cleanup so the GPU doesn't accumulate them every
  // time the user toggles modes.
  const floorTexture = useMemo(() => createFloorTexture(length, palette), [length, palette])
  const wallTexture = useMemo(() => createWallTexture(length, palette), [length, palette])
  const ceilingTexture = useMemo(() => createCeilingTexture(length, palette), [length, palette])
  useEffect(() => {
    return () => {
      floorTexture.dispose()
      wallTexture.dispose()
      ceilingTexture.dispose()
    }
  }, [floorTexture, wallTexture, ceilingTexture])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -length / 2]}>
        <planeGeometry args={[HALLWAY_WIDTH, length]} />
        <meshStandardMaterial map={floorTexture} roughness={0.4} metalness={0.1} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, HALLWAY_HEIGHT, -length / 2]}>
        <planeGeometry args={[HALLWAY_WIDTH, length]} />
        <meshStandardMaterial map={ceilingTexture} roughness={0.9} />
      </mesh>

      <mesh position={[-HALLWAY_WIDTH / 2, HALLWAY_HEIGHT / 2 - 0.25, -length / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, HALLWAY_HEIGHT + 0.5]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} />
      </mesh>

      <mesh position={[HALLWAY_WIDTH / 2, HALLWAY_HEIGHT / 2 - 0.25, -length / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, HALLWAY_HEIGHT + 0.5]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} />
      </mesh>

      <mesh position={[0, HALLWAY_HEIGHT / 2 - 0.25, -length]}>
        <planeGeometry args={[HALLWAY_WIDTH, HALLWAY_HEIGHT + 0.5]} />
        <meshStandardMaterial color={palette.wall} roughness={0.7} />
      </mesh>

      {Array.from({ length: Math.ceil(length / 8) }).map((_, i) => (
        <group key={i}>
          <mesh position={[-1.5, HALLWAY_HEIGHT - 0.05, -(i * 8 + 4)]}>
            <boxGeometry args={[0.15, 0.05, 6]} />
            <meshStandardMaterial color={palette.ceilingStrip} emissive={palette.ceilingStrip} emissiveIntensity={palette.ceilingStripIntensity} />
          </mesh>
          <mesh position={[1.5, HALLWAY_HEIGHT - 0.05, -(i * 8 + 4)]}>
            <boxGeometry args={[0.15, 0.05, 6]} />
            <meshStandardMaterial color={palette.ceilingStrip} emissive={palette.ceilingStrip} emissiveIntensity={palette.ceilingStripIntensity} />
          </mesh>
          <pointLight
            position={[0, HALLWAY_HEIGHT - 0.3, -(i * 8 + 4)]}
            intensity={palette.ceilingPointIntensity}
            distance={14}
            color={palette.ceilingPointColor}
          />
        </group>
      ))}

      {Array.from({ length: Math.ceil(length / 12) }).map((_, i) => (
        <group key={`floor-light-${i}`}>
          <pointLight position={[-HALLWAY_WIDTH / 2 + 0.3, 0, -(i * 12 + 6)]} intensity={0.3} distance={4} color={palette.floorAccentColor} />
          <pointLight position={[HALLWAY_WIDTH / 2 - 0.3, 0, -(i * 12 + 6)]} intensity={0.3} distance={4} color={palette.floorAccentColor} />
        </group>
      ))}

      <mesh position={[0, HALLWAY_HEIGHT / 2, -length + 0.1]}>
        <planeGeometry args={[HALLWAY_WIDTH, HALLWAY_HEIGHT]} />
        <meshBasicMaterial color={palette.endWall} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

// ---- Camera Controller (FPS mode only - no scroll navigation) ----
function CameraController({
  totalLength,
  artworkGroup,
  onSelectItem,
  onLockChange,
  onAimedItemChange,
  isTouchDevice,
  moveStateRef,
  touchExitSignal,
}: {
  totalLength: number
  artworkGroup: React.RefObject<THREE.Group | null>
  onSelectItem: (item: PortfolioItem) => void
  onLockChange: (locked: boolean) => void
  onAimedItemChange: (item: PortfolioItem | null) => void
  isTouchDevice: boolean
  moveStateRef: MutableRefObject<{ forward: boolean; backward: boolean; left: boolean; right: boolean }>
  touchExitSignal: MutableRefObject<boolean>
}) {
  const { camera, gl, scene } = useThree()

  const cbRef = useRef({ onSelectItem, onLockChange, onAimedItemChange })
  cbRef.current = { onSelectItem, onLockChange, onAimedItemChange }

  const isLocked = useRef(false)
  const isTouchActive = useRef(false)
  const yaw = useRef(0)
  const pitch = useRef(0)
  const scrollVelocity = useRef(0)

  const lookTouchId = useRef<number | null>(null)
  const lastLookTouch = useRef<{ x: number; y: number } | null>(null)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)
  const touchStartTime = useRef(0)
  const touchMoved = useRef(false)

  const raycaster = useRef(new THREE.Raycaster())
  const centerVec = useRef(new THREE.Vector2(0, 0))
  const aimedItem = useRef<PortfolioItem | null>(null)
  const frameCount = useRef(0)

  const scrollTargetQuat = useRef(new THREE.Quaternion())

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === canvas
      if (locked && !isLocked.current) {
        yaw.current = 0
        pitch.current = 0
      } else if (!locked && isLocked.current) {
        moveStateRef.current = { forward: false, backward: false, left: false, right: false }
        scrollVelocity.current = 0
      }
      isLocked.current = locked
      cbRef.current.onLockChange(locked)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return
      yaw.current -= e.movementX * MOUSE_SENSITIVITY
      pitch.current -= e.movementY * MOUSE_SENSITIVITY
      pitch.current = THREE.MathUtils.clamp(pitch.current, -Math.PI / 3, Math.PI / 3)
    }

    const onClick = () => {
      if (isTouchDevice) return
      if (!isLocked.current) {
        canvas.requestPointerLock()
      } else if (aimedItem.current) {
        document.exitPointerLock()
        cbRef.current.onSelectItem(aimedItem.current)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isLocked.current) return
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': moveStateRef.current.forward = true; e.preventDefault(); break
        case 'KeyS': case 'ArrowDown': moveStateRef.current.backward = true; e.preventDefault(); break
        case 'KeyA': case 'ArrowLeft': moveStateRef.current.left = true; e.preventDefault(); break
        case 'KeyD': case 'ArrowRight': moveStateRef.current.right = true; e.preventDefault(); break
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': moveStateRef.current.forward = false; break
        case 'KeyS': case 'ArrowDown': moveStateRef.current.backward = false; break
        case 'KeyA': case 'ArrowLeft': moveStateRef.current.left = false; break
        case 'KeyD': case 'ArrowRight': moveStateRef.current.right = false; break
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (isLocked.current) {
        e.preventDefault()
        scrollVelocity.current += e.deltaY * 0.005
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (!isTouchDevice) return
      const touch = e.changedTouches[0]
      const rect = canvas.getBoundingClientRect()
      const relX = (touch.clientX - rect.left) / rect.width
      const relY = (touch.clientY - rect.top) / rect.height
      const inJoystickZone = relX < 0.35 && relY > 0.55

      if (!isTouchActive.current) {
        if (!inJoystickZone) {
          e.preventDefault()
          isTouchActive.current = true
          yaw.current = 0
          pitch.current = 0
          cbRef.current.onLockChange(true)
        }
      }

      if (isTouchActive.current && lookTouchId.current === null && !inJoystickZone) {
        e.preventDefault()
        lookTouchId.current = touch.identifier
        lastLookTouch.current = { x: touch.clientX, y: touch.clientY }
        touchStartPos.current = { x: touch.clientX, y: touch.clientY }
        touchStartTime.current = Date.now()
        touchMoved.current = false
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouchDevice || !isTouchActive.current) return
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        if (touch.identifier === lookTouchId.current && lastLookTouch.current) {
          e.preventDefault()
          const dx = touch.clientX - lastLookTouch.current.x
          const dy = touch.clientY - lastLookTouch.current.y

          yaw.current -= dx * TOUCH_SENSITIVITY
          pitch.current -= dy * TOUCH_SENSITIVITY
          pitch.current = THREE.MathUtils.clamp(pitch.current, -Math.PI / 3, Math.PI / 3)

          lastLookTouch.current = { x: touch.clientX, y: touch.clientY }

          if (touchStartPos.current &&
            (Math.abs(touch.clientX - touchStartPos.current.x) > 10 ||
             Math.abs(touch.clientY - touchStartPos.current.y) > 10)) {
            touchMoved.current = true
          }
        }
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!isTouchDevice || !isTouchActive.current) return
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i]
        if (touch.identifier === lookTouchId.current) {
          const elapsed = Date.now() - touchStartTime.current
          if (elapsed < 300 && !touchMoved.current) {
            const rect = canvas.getBoundingClientRect()
            const tapNDC = new THREE.Vector2(
              ((touch.clientX - rect.left) / rect.width) * 2 - 1,
              -((touch.clientY - rect.top) / rect.height) * 2 + 1
            )
            raycaster.current.setFromCamera(tapNDC, camera)
            const objects = artworkGroup.current ? artworkGroup.current.children : scene.children
            const intersects = raycaster.current.intersectObjects(objects, true)
            const hit = intersects.find(h => h.object.userData?.portfolioItem && h.distance < 8)
            if (hit) {
              const tappedItem = hit.object.userData.portfolioItem as PortfolioItem
              isTouchActive.current = false
              moveStateRef.current = { forward: false, backward: false, left: false, right: false }
              cbRef.current.onLockChange(false)
              cbRef.current.onSelectItem(tappedItem)
            }
          }
          lookTouchId.current = null
          lastLookTouch.current = null
        }
      }
    }

    canvas.addEventListener('click', onClick)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd, { passive: false })
    canvas.addEventListener('touchcancel', onTouchEnd, { passive: false })

    return () => {
      canvas.removeEventListener('click', onClick)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('wheel', onWheel)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [gl, camera, totalLength, isTouchDevice, moveStateRef, artworkGroup, scene, touchExitSignal])

  useFrame((_, delta) => {
    frameCount.current++

    if (touchExitSignal.current) {
      isTouchActive.current = false
      moveStateRef.current = { forward: false, backward: false, left: false, right: false }
      cbRef.current.onLockChange(false)
      touchExitSignal.current = false
    }

    if (isLocked.current || isTouchActive.current) {
      const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current))
      const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current))
      const move = new THREE.Vector3()

      if (moveStateRef.current.forward) move.add(forward)
      if (moveStateRef.current.backward) move.sub(forward)
      if (moveStateRef.current.right) move.add(right)
      if (moveStateRef.current.left) move.sub(right)

      if (move.length() > 0) {
        move.normalize().multiplyScalar(MOVE_SPEED * delta)
        camera.position.add(move)
      }

      if (Math.abs(scrollVelocity.current) > 0.001) {
        camera.position.add(forward.clone().multiplyScalar(-scrollVelocity.current * delta))
        scrollVelocity.current *= 0.92
      }

      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -HALLWAY_WIDTH / 2 + 0.5, HALLWAY_WIDTH / 2 - 0.5)
      camera.position.y = FRAME_Y
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -(totalLength - 2), 2)

      const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ')
      camera.quaternion.setFromEuler(euler)

      if (frameCount.current % 3 === 0) {
        raycaster.current.setFromCamera(centerVec.current, camera)
        const objects = artworkGroup.current ? artworkGroup.current.children : scene.children
        const intersects = raycaster.current.intersectObjects(objects, true)
        const hit = intersects.find(i => i.object.userData?.portfolioItem && i.distance < 8)
        const newAimed = hit ? (hit.object.userData.portfolioItem as PortfolioItem) : null

        if (newAimed?.id !== aimedItem.current?.id) {
          aimedItem.current = newAimed
          fpsState.aimedItemId = newAimed?.id || null
          cbRef.current.onAimedItemChange(newAimed)
        }
      }
    } else {
      camera.position.x += (0 - camera.position.x) * 0.05
      camera.position.y += (FRAME_Y - camera.position.y) * 0.05
      camera.position.z += (2 - camera.position.z) * 0.05

      const lookTarget = new THREE.Vector3(0, FRAME_Y, -10)
      const lookMatrix = new THREE.Matrix4().lookAt(camera.position, lookTarget, new THREE.Vector3(0, 1, 0))
      scrollTargetQuat.current.setFromRotationMatrix(lookMatrix)
      camera.quaternion.slerp(scrollTargetQuat.current, 0.08)

      if (fpsState.aimedItemId) {
        fpsState.aimedItemId = null
        aimedItem.current = null
        cbRef.current.onAimedItemChange(null)
      }
    }
  })

  return null
}

// ---- Main Gallery3D Component ----
export function Gallery3D({ onSelectItem }: { onSelectItem: (item: PortfolioItem) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const artworkGroupRef = useRef<THREE.Group>(null)
  const moveStateRef = useRef({ forward: false, backward: false, left: false, right: false })
  const touchExitSignal = useRef(false)
  const [isLocked, setIsLocked] = useState(false)
  const [aimedItem, setAimedItem] = useState<PortfolioItem | null>(null)
  const palette = useGalleryPalette()

  // Filter to featured items only. Logos for the same brand show up twice
  // across categories (e.g. Portal747 in SaaS Products + brand-identity), so
  // the unfiltered list creates duplicates in the hallway. Featured-only
  // narrows the 3D scene to ~3-5 strongest pieces.
  const items = useMemo(() => portfolioItems.filter(i => i.featured), [])
  const totalLength = items.length * FRAME_SPACING + 10

  const framedItems = useMemo(() => {
    return items.map((item, i) => ({
      item,
      side: (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
      position: [
        i % 2 === 0 ? -HALLWAY_WIDTH / 2 + 0.1 : HALLWAY_WIDTH / 2 - 0.1,
        FRAME_Y,
        -(i * FRAME_SPACING + 4),
      ] as [number, number, number],
    }))
  }, [items])

  const [isTouchDevice, setIsTouchDevice] = useState(false)
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window && navigator.maxTouchPoints > 0 && !window.matchMedia('(pointer: fine)').matches)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden" style={{ touchAction: isTouchDevice && isLocked ? 'none' : 'auto' }}>
      <Canvas
        camera={{ position: [0, FRAME_Y, 2], fov: 65, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={[palette.sceneBg]} />
        <fog attach="fog" args={[palette.sceneBg, palette.fogNear, palette.fogFar]} />

        <ambientLight intensity={palette.ambientIntensity} />
        <hemisphereLight args={[palette.hemiSky, palette.hemiGround, palette.hemiIntensity]} />

        <Suspense fallback={null}>
          <Hallway length={totalLength} />

          <group ref={artworkGroupRef}>
            {framedItems.map(({ item, side, position }) => (
              <PortraitFrame
                key={item.id}
                item={item}
                position={position}
                side={side}
              />
            ))}
          </group>
        </Suspense>

        <CameraController
          totalLength={totalLength}
          artworkGroup={artworkGroupRef}
          onSelectItem={onSelectItem}
          onLockChange={setIsLocked}
          onAimedItemChange={setAimedItem}
          isTouchDevice={isTouchDevice}
          moveStateRef={moveStateRef}
          touchExitSignal={touchExitSignal}
        />
      </Canvas>

      {isLocked && !isTouchDevice && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className={`relative w-6 h-6 transition-transform duration-200 ${aimedItem ? 'scale-150' : ''}`}>
            <div className={`absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full rounded-full ${aimedItem ? 'bg-accent' : 'bg-white/50'}`} />
            <div className={`absolute top-1/2 left-0 -translate-y-1/2 h-0.5 w-full rounded-full ${aimedItem ? 'bg-accent' : 'bg-white/50'}`} />
          </div>
          {aimedItem && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-8 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-white text-sm whitespace-nowrap">
              Click to view: {aimedItem.title}
            </div>
          )}
        </div>
      )}

      {isLocked && isTouchDevice && (
        <MobileControls
          moveStateRef={moveStateRef}
          onExit={() => { touchExitSignal.current = true }}
        />
      )}

      {isLocked && isTouchDevice && aimedItem && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm text-white text-sm pointer-events-none whitespace-nowrap">
          Tap to view: {aimedItem.title}
        </div>
      )}

      {!isLocked && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          {isTouchDevice ? (
            <div className="text-center bg-black/60 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10">
              <p className="text-white text-lg font-medium mb-3">Tap to explore</p>
              <div className="text-white/60 text-sm space-y-1.5">
                <p>Drag to look around</p>
                <p>Use joystick to move</p>
                <p>Tap artwork to view details</p>
              </div>
            </div>
          ) : (
            <div className="text-center bg-black/60 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10">
              <p className="text-white text-lg font-medium mb-3">Click to explore</p>
              <div className="text-white/60 text-sm space-y-1.5">
                <p>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80 text-xs font-mono">W</kbd>{' '}
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80 text-xs font-mono">A</kbd>{' '}
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80 text-xs font-mono">S</kbd>{' '}
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80 text-xs font-mono">D</kbd>{' '}
                  to move
                </p>
                <p>Mouse to look around</p>
                <p>Click artwork to view details</p>
                <p>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80 text-xs font-mono">ESC</kbd>{' '}
                  to exit
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {isLocked && !isTouchDevice && (
        <div className="absolute top-4 right-4 text-white/40 text-xs bg-black/30 px-3 py-2 rounded-lg pointer-events-none">
          WASD to move &bull; Mouse to look &bull; Click artwork &bull; ESC to exit
        </div>
      )}
    </div>
  )
}
