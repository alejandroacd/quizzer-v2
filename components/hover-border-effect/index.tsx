"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT"

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
} & React.HTMLAttributes<HTMLElement>>) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>("TOP")

  const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"]

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        const currentIndex = directions.indexOf(direction)
        const nextIndex = clockwise
          ? (currentIndex - 1 + directions.length) % directions.length
          : (currentIndex + 1) % directions.length
        setDirection(directions[nextIndex])
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered,directions,  direction, duration, clockwise])

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, white 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, white 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, white 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, white 0%, rgba(255, 255, 255, 0) 100%)",
  }

  const highlight =
    "radial-gradient(75% 181% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%) "

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center justify-center overflow-visible p-px w-fit",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("z-10 bg-black  rounded-[inherit]", className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      <div className="absolute inset-[2px] rounded-[100px] z-1 bg-black" />
    </Tag>
  )
}
