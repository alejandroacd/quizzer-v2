"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, BookOpen, Target, Flame, Trophy } from "lucide-react"

const PRESETS = [
  { label: "Quick",  value: 5,  Icon: Zap,      color: "from-amber-400 to-orange-500"  },
  { label: "Short",  value: 10, Icon: BookOpen,  color: "from-blue-400 to-cyan-500"     },
  { label: "Medium", value: 20, Icon: Target,    color: "from-violet-400 to-purple-500" },
  { label: "Long",   value: 35, Icon: Flame,     color: "from-rose-400 to-pink-500"     },
  { label: "Full",   value: 50, Icon: Trophy,    color: "from-yellow-400 to-amber-500"  },
] as const

type Mode = { label: string; gradient: string; text: string; emoji: string }

function getMode(val: number): Mode {
  if (val <= 5)  return { label: "Lightning Round", gradient: "from-amber-400 to-orange-500",   text: "text-orange-500",  emoji: "⚡" }
  if (val <= 15) return { label: "Quick Session",   gradient: "from-blue-400 to-cyan-500",      text: "text-cyan-500",    emoji: "📖" }
  if (val <= 25) return { label: "Standard Quiz",   gradient: "from-violet-400 to-purple-500",  text: "text-violet-500",  emoji: "🎯" }
  if (val <= 40) return { label: "Deep Practice",   gradient: "from-rose-400 to-pink-500",      text: "text-rose-500",    emoji: "🔥" }
  return           { label: "Champion Mode",        gradient: "from-yellow-400 to-amber-500",   text: "text-amber-500",   emoji: "🏆" }
}

function ProgressRing({ value, size = 180 }: { value: number; size?: number }) {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const pct = (value - 5) / (50 - 5)
  const offset = circ - pct * circ

  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={7} className="stroke-border" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" strokeWidth={7} strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="stroke-primary"
      />
    </svg>
  )
}

export const QuestionsLengthSelection = ({ onLengthSelect }: { onLengthSelect: (length: number) => void }) => {
  const [value, setValue] = useState<number[]>([10])
  const [visible, setVisible] = useState(false)

  useEffect(() => { setVisible(true) }, [])

  const mode = getMode(value[0])
  const handleConfirm = () => onLengthSelect(value[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto flex flex-col items-center gap-7 py-4"
    >
      {/* ── Header ─────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest"
        >
          Configure your quiz
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold tracking-tight text-balance"
        >
          How many questions?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground"
        >
          Pick a preset or slide to find your perfect challenge
        </motion.p>
      </div>

      {/* ── Progress ring + hero number ────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 22 }}
        className="relative flex items-center justify-center"
      >
        <ProgressRing value={value[0]} size={190} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value[0]}
              initial={{ opacity: 0, y: 14, scale: 0.75 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.75 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`text-6xl font-black bg-gradient-to-br ${mode.gradient} bg-clip-text text-transparent leading-none`}
            >
              {value[0]}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-muted-foreground font-semibold tracking-wide">
            question{value[0] !== 1 ? "s" : ""}
          </span>
        </div>
      </motion.div>

      {/* ── Mode badge ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode.label}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r ${mode.gradient} text-white text-sm font-bold shadow-lg`}
        >
          <span role="img" aria-label={mode.label}>{mode.emoji}</span>
          <span>{mode.label}</span>
        </motion.div>
      </AnimatePresence>

      {/* ── Preset chips ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Preset question counts"
      >
        {PRESETS.map(({ label, value: preset, Icon, color }) => {
          const active = value[0] === preset
          return (
            <motion.button
              key={preset}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setValue([preset])}
              aria-pressed={active}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200
                ${active
                  ? `bg-gradient-to-r ${color} text-white border-transparent shadow-md`
                  : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              {label}
              <span className={active ? "opacity-75" : "opacity-50"}>{preset}</span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* ── Slider ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full px-2"
      >
        <Slider
          value={value}
          onValueChange={setValue}
          min={5}
          max={50}
          step={5}
          aria-label="Number of questions"
          className="[&>span:first-child]:h-2 cursor-pointer [&>span:first-child]:bg-primary/15"
        />
        <div className="flex justify-between mt-2 px-0.5">
          <span className="text-xs text-muted-foreground">5 min</span>
          <span className="text-xs text-muted-foreground">50 max</span>
        </div>
      </motion.div>

      {/* ── CTA ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="w-full"
      >
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 12px 36px rgba(0,0,0,0.18)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          className={`relative w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r ${mode.gradient} shadow-lg overflow-hidden`}
        >
          <span className="relative z-10">
            Let&apos;s Go — {value[0]} Questions
          </span>
          {/* shimmer sweep */}
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
            animate={{ x: ["-110%", "210%"] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 0.8 }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}