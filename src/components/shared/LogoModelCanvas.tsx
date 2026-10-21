import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TrackballControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Same spin as the CubeRift hero on krisexplainsit.com (TunnelForge3DHomepage).
const SPIN = (20 * Math.PI) / 180
const RESUME_AFTER_MS = 1500
const FOV = 35

function Model({
  src,
  spinning,
  onLoaded,
}: {
  src: string
  spinning: React.MutableRefObject<boolean>
  onLoaded: () => void
}) {
  // drei's useGLTF wires the meshopt decoder the GLB is packed with.
  const { scene } = useGLTF(src)
  const group = useRef<THREE.Group>(null)

  // Center on the sign's middle and scale its face (the larger of width
  // and height) to 2 units, so the sign fills the tile head-on. A flat
  // sign never gets bigger than its face when turned.
  const fitted = useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    root.position.sub(box.getCenter(new THREE.Vector3()))
    const wrap = new THREE.Group()
    wrap.add(root)
    wrap.scale.setScalar(2 / Math.max(size.x, size.y, 0.001))
    return wrap
  }, [scene])

  useEffect(onLoaded, [onLoaded])

  useFrame((_, dt) => {
    if (group.current && spinning.current) group.current.rotation.y += SPIN * Math.min(dt, 0.1)
  })

  return (
    <group ref={group}>
      <primitive object={fitted} />
    </group>
  )
}

export default function LogoModelCanvas({
  src,
  active,
  onLoaded,
}: {
  src: string
  active: boolean
  onLoaded: () => void
}) {
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const spinning = useRef(!reduceMotion)
  const resume = useRef<number>()

  useEffect(() => () => window.clearTimeout(resume.current), [])

  // Camera distance that fits the 2-unit face in the view height, with a
  // little room so the turning edge and glow aren't clipped.
  const distance = 1.12 / Math.tan(THREE.MathUtils.degToRad(FOV / 2))

  return (
    <Canvas
      className="!absolute inset-0"
      style={{ touchAction: 'none', cursor: 'grab' }}
      frameloop={active ? 'always' : 'never'}
      flat
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ fov: FOV, position: [0, 0, distance] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <Model src={src} spinning={spinning} onLoaded={onLoaded} />
      {/* Trackball: free rotation on every axis, including a circular drag
          to roll. Zoom and pan stay off so the page wheel still scrolls. */}
      <TrackballControls
        noZoom
        noPan
        rotateSpeed={3}
        dynamicDampingFactor={0.12}
        onStart={() => {
          spinning.current = false
          window.clearTimeout(resume.current)
        }}
        onEnd={() => {
          if (reduceMotion) return
          resume.current = window.setTimeout(() => {
            spinning.current = true
          }, RESUME_AFTER_MS)
        }}
      />
    </Canvas>
  )
}
