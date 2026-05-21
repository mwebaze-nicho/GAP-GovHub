'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface OverflowIndicatorProps {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical' | 'both'
}

export function OverflowIndicator({
  children,
  className,
  direction = 'horizontal'
}: OverflowIndicatorProps) {
  const [showLeftIndicator, setShowLeftIndicator] = useState(false)
  const [showRightIndicator, setShowRightIndicator] = useState(false)
  const [showTopIndicator, setShowTopIndicator] = useState(false)
  const [showBottomIndicator, setShowBottomIndicator] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const checkOverflow = () => {
    const container = containerRef.current
    if (!container) return

    if (direction === 'horizontal' || direction === 'both') {
      setShowLeftIndicator(container.scrollLeft > 0)
      setShowRightIndicator(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      )
    }

    if (direction === 'vertical' || direction === 'both') {
      setShowTopIndicator(container.scrollTop > 0)
      setShowBottomIndicator(
        container.scrollTop < container.scrollHeight - container.clientHeight - 1
      )
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    checkOverflow()
    container.addEventListener('scroll', checkOverflow)

    const resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', checkOverflow)
      resizeObserver.disconnect()
    }
  }, [direction])

  return (
    <div className={cn('relative', className)}>
      {/* Uganda Flag Overflow Indicators - National Standard Order: Black, Yellow, Red */}

      {/* Left Indicator */}
      {(direction === 'horizontal' || direction === 'both') && showLeftIndicator && (
        <div className="absolute left-0 top-0 bottom-0 w-1 z-10 pointer-events-none">
          <div className="h-full bg-gradient-to-b from-black via-[#FFD700] to-[#DC143C] opacity-80 shadow-lg" />
        </div>
      )}

      {/* Right Indicator */}
      {(direction === 'horizontal' || direction === 'both') && showRightIndicator && (
        <div className="absolute right-0 top-0 bottom-0 w-1 z-10 pointer-events-none">
          <div className="h-full bg-gradient-to-b from-black via-[#FFD700] to-[#DC143C] opacity-80 shadow-lg" />
        </div>
      )}

      {/* Top Indicator */}
      {(direction === 'vertical' || direction === 'both') && showTopIndicator && (
        <div className="absolute top-0 left-0 right-0 h-1 z-10 pointer-events-none">
          <div className="w-full bg-gradient-to-r from-black via-[#FFD700] to-[#DC143C] opacity-80 shadow-lg" />
        </div>
      )}

      {/* Bottom Indicator */}
      {(direction === 'vertical' || direction === 'both') && showBottomIndicator && (
        <div className="absolute bottom-0 left-0 right-0 h-1 z-10 pointer-events-none">
          <div className="w-full bg-gradient-to-r from-black via-[#FFD700] to-[#DC143C] opacity-80 shadow-lg" />
        </div>
      )}

      {/* Scrollable Content */}
      <div ref={containerRef} className="w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  )
}