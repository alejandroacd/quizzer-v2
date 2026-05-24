"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useRef, useState, useCallback } from "react"

interface CategoryCardProps {
  id: string
  title: string
  description: string
  image: string
  questionCount: number
  difficulty: string
  index: number
  featured?: boolean
}

const cardThemes = {
  sports: {
    gradient: "from-violet-500/[0.09] via-purple-500/[0.04] to-transparent",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    accentText: "text-violet-600 dark:text-violet-400",
    numberColor: "text-violet-500",
    spotlight: "rgba(139, 92, 246, 0.12)",
    shadow: "rgba(139, 92, 246, 0.28)",
  },
  geography: {
    gradient: "from-emerald-500/[0.09] via-teal-500/[0.04] to-transparent",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    accentText: "text-emerald-600 dark:text-emerald-400",
    numberColor: "text-emerald-500",
    spotlight: "rgba(16, 185, 129, 0.12)",
    shadow: "rgba(16, 185, 129, 0.28)",
  },
  history: {
    gradient: "from-amber-500/[0.09] via-orange-500/[0.04] to-transparent",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    accentText: "text-amber-600 dark:text-amber-400",
    numberColor: "text-amber-500",
    spotlight: "rgba(245, 158, 11, 0.12)",
    shadow: "rgba(245, 158, 11, 0.28)",
  },
  arts: {
    gradient: "from-rose-500/[0.09] via-pink-500/[0.04] to-transparent",
    iconBg: "bg-rose-100 dark:bg-rose-500/20",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    accentText: "text-rose-600 dark:text-rose-400",
    numberColor: "text-rose-500",
    spotlight: "rgba(244, 63, 94, 0.12)",
    shadow: "rgba(244, 63, 94, 0.28)",
  },
} as const

type ThemeKey = keyof typeof cardThemes

export function CategoryCard({
  id, title, description, image, questionCount, difficulty, index, featured = false
}: CategoryCardProps) {
  const router = useRouter()
  const theme = cardThemes[id as ThemeKey] ?? cardThemes.sports
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsHovered(false)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        boxShadow: isHovered
          ? `0 24px 60px -12px ${theme.shadow}, 0 0 0 1px ${theme.shadow}`
          : "0 4px 24px -6px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/quiz/${id}`)}
      className={cn(
        "group relative cursor-pointer rounded-2xl overflow-hidden h-full",
        "bg-card/80 backdrop-blur-sm",
        featured ? "min-h-[260px]" : "min-h-[240px]"
      )}
    >
      {/* Base gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
        theme.gradient,
        isHovered ? "opacity-100" : "opacity-60"
      )} />

      {/* Noise grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(380px circle at ${spotlight.x}px ${spotlight.y}px, ${theme.spotlight}, transparent 65%)`,
        }}
      />

      {/* Decorative background number */}
      <div
        className={cn(
          "absolute -bottom-5 -right-3 select-none pointer-events-none",
          "text-[148px] font-black leading-none opacity-[0.055]",
          "transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.08]",
          theme.numberColor
        )}
      >
        0{index + 1}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Top: icon + badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-500",
            "group-hover:scale-110 group-hover:-rotate-6",
            theme.iconBg
          )}>
            <Image src={image} alt={title} width={28} height={28} />
          </div>
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase",
            theme.badge
          )}>
            {difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-black tracking-tight text-foreground mb-2.5 leading-tight",
          featured ? "text-[1.6rem]" : "text-xl"
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-5 line-clamp-3">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-baseline gap-1">
            <span className={cn("text-sm font-bold tabular-nums", theme.accentText)}>
              {questionCount}
            </span>
            <span className="text-xs text-muted-foreground">questions</span>
          </div>
          <div className={cn(
            "flex items-center gap-1.5 text-xs font-semibold tracking-wide",
            "transition-all duration-300 group-hover:gap-2.5",
            theme.accentText
          )}>
            <span>Play now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
