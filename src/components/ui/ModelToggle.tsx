"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const themes = ["dark", "light"] as const
type Theme = (typeof themes)[number]

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    // Normalize current theme for cycling, default to 'dark' if unknown
    const currentTheme: Theme = themes.includes(theme as Theme)
        ? (theme as Theme)
        : "dark"

    // Get next theme in the cycle
    const handleToggle = () => {
        const currentIndex = themes.indexOf(currentTheme)
        const nextIndex = (currentIndex + 1) % themes.length
        setTheme(themes[nextIndex])
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            aria-label="Toggle theme"
        >
            {/* Show Sun icon for light and system, Moon for dark */}
            {currentTheme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
        </Button>
    )
}
