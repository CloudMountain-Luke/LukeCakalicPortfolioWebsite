import { useRef, useCallback, type MutableRefObject } from 'react'

interface MobileControlsProps {
  moveStateRef: MutableRefObject<{ forward: boolean; backward: boolean; left: boolean; right: boolean }>
  onExit: () => void
}

const JOYSTICK_RADIUS = 50
const DEAD_ZONE = 12

export function MobileControls({ moveStateRef, onExit }: MobileControlsProps) {
  const joystickRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const joystickTouchId = useRef<number | null>(null)
  const joystickCenter = useRef({ x: 0, y: 0 })

  const resetJoystick = useCallback(() => {
    if (thumbRef.current) {
      thumbRef.current.style.transform = 'translate(-50%, -50%)'
    }
    if (moveStateRef.current) {
      moveStateRef.current.forward = false
      moveStateRef.current.backward = false
      moveStateRef.current.left = false
      moveStateRef.current.right = false
    }
  }, [moveStateRef])

  const handleJoystickStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
    const touch = e.changedTouches[0]
    if (joystickTouchId.current !== null) return

    const rect = joystickRef.current?.getBoundingClientRect()
    if (!rect) return

    joystickTouchId.current = touch.identifier
    joystickCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }, [])

  const handleJoystickMove = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier !== joystickTouchId.current) continue

      const dx = touch.clientX - joystickCenter.current.x
      const dy = touch.clientY - joystickCenter.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Clamp thumb position to joystick radius
      const clampedDist = Math.min(dist, JOYSTICK_RADIUS)
      const angle = Math.atan2(dy, dx)
      const clampedX = Math.cos(angle) * clampedDist
      const clampedY = Math.sin(angle) * clampedDist

      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`
      }

      // Update move state
      if (moveStateRef.current) {
        moveStateRef.current.forward = dy < -DEAD_ZONE
        moveStateRef.current.backward = dy > DEAD_ZONE
        moveStateRef.current.left = dx < -DEAD_ZONE
        moveStateRef.current.right = dx > DEAD_ZONE
      }
    }
  }, [moveStateRef])

  const handleJoystickEnd = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId.current) {
        joystickTouchId.current = null
        resetJoystick()
        break
      }
    }
  }, [resetJoystick])

  return (
    <>
      {/* Virtual Joystick - bottom left */}
      <div
        ref={joystickRef}
        className="absolute bottom-8 left-8 w-28 h-28 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm"
        style={{ touchAction: 'none' }}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
        onTouchCancel={handleJoystickEnd}
      >
        <div
          ref={thumbRef}
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-white/25 border border-white/40 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Exit button - top right */}
      <button
        onClick={onExit}
        className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-sm active:bg-white/20"
        style={{ touchAction: 'manipulation' }}
      >
        Exit
      </button>

      {/* Hint text - bottom right */}
      <div className="absolute bottom-10 right-8 text-white/40 text-xs pointer-events-none">
        Drag to look &bull; Tap artwork to view
      </div>
    </>
  )
}
