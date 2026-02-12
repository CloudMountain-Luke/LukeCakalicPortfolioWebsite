import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { portfolioItems, type PortfolioItem } from '../../data/portfolio'

// ---- Constants ----
const HALLWAY_WIDTH = 8
const HALLWAY_HEIGHT = 5
const FRAME_SPACING = 6
const FRAME_WIDTH = 3.5
const FRAME_HEIGHT = 2.5
const FRAME_Y = 1.8
const WALL_COLOR = '#252540'
const FLOOR_COLOR = '#1e1e32'
const CEILING_COLOR = '#1a1a2e'
const FRAME_BORDER_COLOR = '#3a3a5a'
const MOVE_SPEED = 5
const MOUSE_SENSITIVITY = 0.002

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
        <meshStandardMaterial color={FRAME_BORDER_COLOR} metalness={0.3} roughness={0.7} />
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
        <meshBasicMaterial color="#0f0f1a" transparent opacity={0.85} />
      </mesh>
      {/* Title - single line, small */}
      <Text
        position={[0, -(frameH / 2) - 0.3, 0.01]}
        fontSize={0.09}
        color="#d4d4e0"
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
        color="#9090a8"
        anchorX="center"
        anchorY="top"
        maxWidth={Math.min(frameW, 2.8)}
        whiteSpace="nowrap"
      >
        {item.client}
      </Text>

      {/* Per-artwork gallery spotlight */}
      <pointLight position={[0, 0.8, 1.5]} intensity={2.0} distance={5} color="#f0f0ff" />
      <pointLight position={[0, -1.5, 0.5]} intensity={0.5} distance={3} color="#ffffff" />
    </group>
  )
}

// ---- Procedural Texture Generators ----
function createFloorTexture(length: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Base color - polished concrete look
  ctx.fillStyle = FLOOR_COLOR
  ctx.fillRect(0, 0, 512, 512)

  // Subtle noise/grain
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const brightness = Math.random() * 15 + 20
    ctx.fillStyle = `rgba(${brightness + 80}, ${brightness + 80}, ${brightness + 120}, 0.15)`
    ctx.fillRect(x, y, 2, 2)
  }

  // Large tile grid
  ctx.strokeStyle = 'rgba(100, 100, 140, 0.25)'
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

  // Subtle inner tile lines
  ctx.strokeStyle = 'rgba(80, 80, 120, 0.1)'
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

function createWallTexture(length: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Base wall color
  ctx.fillStyle = WALL_COLOR
  ctx.fillRect(0, 0, 512, 256)

  // Subtle vertical gradient (darker at bottom)
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, 'rgba(100, 100, 160, 0.08)')
  grad.addColorStop(1, 'rgba(0, 0, 20, 0.15)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)

  // Fine grain texture
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 256
    const brightness = Math.random() * 20 + 30
    ctx.fillStyle = `rgba(${brightness + 60}, ${brightness + 60}, ${brightness + 100}, 0.08)`
    ctx.fillRect(x, y, 1, 1)
  }

  // Horizontal panel lines (subtle wainscoting effect)
  ctx.strokeStyle = 'rgba(60, 60, 100, 0.2)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 200)
  ctx.lineTo(512, 200)
  ctx.stroke()

  // Vertical panel divisions
  ctx.strokeStyle = 'rgba(80, 80, 130, 0.12)'
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

function createCeilingTexture(length: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Base ceiling color
  ctx.fillStyle = CEILING_COLOR
  ctx.fillRect(0, 0, 256, 256)

  // Acoustic tile pattern
  ctx.strokeStyle = 'rgba(50, 50, 80, 0.3)'
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

  // Subtle perforations
  ctx.fillStyle = 'rgba(20, 20, 40, 0.2)'
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
  const floorTexture = useMemo(() => createFloorTexture(length), [length])
  const wallTexture = useMemo(() => createWallTexture(length), [length])
  const ceilingTexture = useMemo(() => createCeilingTexture(length), [length])

  return (
    <group>
      {/* Floor - polished concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -length / 2]}>
        <planeGeometry args={[HALLWAY_WIDTH, length]} />
        <meshStandardMaterial map={floorTexture} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Ceiling - acoustic tiles */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, HALLWAY_HEIGHT, -length / 2]}>
        <planeGeometry args={[HALLWAY_WIDTH, length]} />
        <meshStandardMaterial map={ceilingTexture} roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-HALLWAY_WIDTH / 2, HALLWAY_HEIGHT / 2 - 0.25, -length / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, HALLWAY_HEIGHT + 0.5]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[HALLWAY_WIDTH / 2, HALLWAY_HEIGHT / 2 - 0.25, -length / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, HALLWAY_HEIGHT + 0.5]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, HALLWAY_HEIGHT / 2 - 0.25, -length]}>
        <planeGeometry args={[HALLWAY_WIDTH, HALLWAY_HEIGHT + 0.5]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.7} />
      </mesh>

      {/* Ceiling light strips - brighter */}
      {Array.from({ length: Math.ceil(length / 8) }).map((_, i) => (
        <group key={i}>
          <mesh position={[-1.5, HALLWAY_HEIGHT - 0.05, -(i * 8 + 4)]}>
            <boxGeometry args={[0.15, 0.05, 6]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[1.5, HALLWAY_HEIGHT - 0.05, -(i * 8 + 4)]}>
            <boxGeometry args={[0.15, 0.05, 6]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
          <pointLight
            position={[0, HALLWAY_HEIGHT - 0.3, -(i * 8 + 4)]}
            intensity={2.0}
            distance={14}
            color="#e8e8ff"
          />
        </group>
      ))}

      {/* Floor accent lighting (subtle blue uplight along walls) */}
      {Array.from({ length: Math.ceil(length / 12) }).map((_, i) => (
        <group key={`floor-light-${i}`}>
          <pointLight position={[-HALLWAY_WIDTH / 2 + 0.3, 0, -(i * 12 + 6)]} intensity={0.3} distance={4} color="#6366f1" />
          <pointLight position={[HALLWAY_WIDTH / 2 - 0.3, 0, -(i * 12 + 6)]} intensity={0.3} distance={4} color="#6366f1" />
        </group>
      ))}

      {/* Gradient plane at far end */}
      <mesh position={[0, HALLWAY_HEIGHT / 2, -length + 0.1]}>
        <planeGeometry args={[HALLWAY_WIDTH, HALLWAY_HEIGHT]} />
        <meshBasicMaterial color="#151528" transparent opacity={0.9} />
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
}: {
  totalLength: number
  artworkGroup: React.RefObject<THREE.Group | null>
  onSelectItem: (item: PortfolioItem) => void
  onLockChange: (locked: boolean) => void
  onAimedItemChange: (item: PortfolioItem | null) => void
}) {
  const { camera, gl, scene } = useThree()

  // Stable callback refs (avoid re-registering listeners)
  const cbRef = useRef({ onSelectItem, onLockChange, onAimedItemChange })
  cbRef.current = { onSelectItem, onLockChange, onAimedItemChange }

  // Camera state (all refs to avoid re-renders)
  const isLocked = useRef(false)
  const yaw = useRef(0)
  const pitch = useRef(0)
  const moveState = useRef({ forward: false, backward: false, left: false, right: false })
  const scrollVelocity = useRef(0)

  // Raycasting
  const raycaster = useRef(new THREE.Raycaster())
  const centerVec = useRef(new THREE.Vector2(0, 0))
  const aimedItem = useRef<PortfolioItem | null>(null)
  const frameCount = useRef(0)

  // For smooth scroll-mode rotation transition
  const scrollTargetQuat = useRef(new THREE.Quaternion())

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === canvas
      if (locked && !isLocked.current) {
        // Entering FPS: reset look direction to forward
        yaw.current = 0
        pitch.current = 0
      } else if (!locked && isLocked.current) {
        // Exiting FPS: clear movement state
        moveState.current = { forward: false, backward: false, left: false, right: false }
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
        case 'KeyW': case 'ArrowUp': moveState.current.forward = true; e.preventDefault(); break
        case 'KeyS': case 'ArrowDown': moveState.current.backward = true; e.preventDefault(); break
        case 'KeyA': case 'ArrowLeft': moveState.current.left = true; e.preventDefault(); break
        case 'KeyD': case 'ArrowRight': moveState.current.right = true; e.preventDefault(); break
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': moveState.current.forward = false; break
        case 'KeyS': case 'ArrowDown': moveState.current.backward = false; break
        case 'KeyA': case 'ArrowLeft': moveState.current.left = false; break
        case 'KeyD': case 'ArrowRight': moveState.current.right = false; break
      }
    }

    const onWheel = (e: WheelEvent) => {
      // Only capture scroll when in FPS mode - otherwise let page scroll normally
      if (isLocked.current) {
        e.preventDefault()
        scrollVelocity.current += e.deltaY * 0.005
      }
      // When not locked, don't prevent default - let the page scroll
    }

    canvas.addEventListener('click', onClick)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      canvas.removeEventListener('click', onClick)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [gl, camera, totalLength])

  useFrame((_, delta) => {
    frameCount.current++

    if (isLocked.current) {
      // ---- FPS MODE ----
      const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current))
      const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current))
      const move = new THREE.Vector3()

      if (moveState.current.forward) move.add(forward)
      if (moveState.current.backward) move.sub(forward)
      if (moveState.current.right) move.add(right)
      if (moveState.current.left) move.sub(right)

      if (move.length() > 0) {
        move.normalize().multiplyScalar(MOVE_SPEED * delta)
        camera.position.add(move)
      }

      // Scroll wheel velocity
      if (Math.abs(scrollVelocity.current) > 0.001) {
        camera.position.add(forward.clone().multiplyScalar(-scrollVelocity.current * delta))
        scrollVelocity.current *= 0.92
      }

      // Clamp to hallway bounds
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -HALLWAY_WIDTH / 2 + 0.5, HALLWAY_WIDTH / 2 - 0.5)
      camera.position.y = FRAME_Y
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -(totalLength - 2), 2)

      // Apply FPS rotation
      const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ')
      camera.quaternion.setFromEuler(euler)

      // Raycast for aimed artwork (every 3 frames for perf)
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
      // ---- IDLE MODE (not in FPS) ----
      // Keep camera at starting position, looking forward
      camera.position.x += (0 - camera.position.x) * 0.05
      camera.position.y += (FRAME_Y - camera.position.y) * 0.05
      camera.position.z += (2 - camera.position.z) * 0.05

      // Smooth rotation back to looking forward
      const lookTarget = new THREE.Vector3(0, FRAME_Y, -10)
      const lookMatrix = new THREE.Matrix4().lookAt(camera.position, lookTarget, new THREE.Vector3(0, 1, 0))
      scrollTargetQuat.current.setFromRotationMatrix(lookMatrix)
      camera.quaternion.slerp(scrollTargetQuat.current, 0.08)

      // Clear aimed state
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
  const [isLocked, setIsLocked] = useState(false)
  const [aimedItem, setAimedItem] = useState<PortfolioItem | null>(null)

  const items = portfolioItems
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

  // Detect touch-only devices for instruction text
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window && navigator.maxTouchPoints > 0 && !window.matchMedia('(pointer: fine)').matches)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden">
      <Canvas
        camera={{ position: [0, FRAME_Y, 2], fov: 65, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#0a0a15']} />
        <fog attach="fog" args={['#0a0a15', 15, 80]} />

        <ambientLight intensity={0.4} />
        <hemisphereLight args={['#b1c8ff', '#1a1a2e', 0.3]} />

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
        />
      </Canvas>

      {/* Crosshair (FPS mode) */}
      {isLocked && (
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

      {/* Instructions overlay (not locked) */}
      {!isLocked && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          {isTouchDevice ? (
            <div className="text-center bg-black/60 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10">
              <p className="text-white text-lg font-medium mb-2">Tap to explore</p>
              <p className="text-white/60 text-sm">Use touch controls to navigate the gallery</p>
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

      {/* Navigation hints (FPS mode) */}
      {isLocked && (
        <div className="absolute top-4 right-4 text-white/40 text-xs bg-black/30 px-3 py-2 rounded-lg pointer-events-none">
          WASD to move &bull; Mouse to look &bull; Click artwork &bull; ESC to exit
        </div>
      )}
    </div>
  )
}
