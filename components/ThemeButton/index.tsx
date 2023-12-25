"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

import { useTheme } from 'next-themes'
import { useCallback } from 'react'



export default function ThemeButton() {

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark'

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {currentTheme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )

}