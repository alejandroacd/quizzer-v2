'use client'

import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { Icon } from "./icon"

export function SwitchThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // ⛔ prevents hydration mismatch

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch data-slot="switch" checked={theme === 'dark'} className="cursor-pointer" onClick={handleThemeChange} />
      <Icon theme={theme} />
    </div>
  )
}
