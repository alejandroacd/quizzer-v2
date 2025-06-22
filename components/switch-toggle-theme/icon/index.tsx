'use client'
import { Moon, Sun } from "lucide-react"

export const Icon = ({ theme }: { theme: string | undefined }) => {
  if (!theme) return null

  return theme === 'dark' ? <Moon /> : <Sun />
}
