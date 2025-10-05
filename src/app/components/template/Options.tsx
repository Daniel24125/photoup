"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import MUIBadge from '@/components/ui/mui-badge'
import { useLanguage } from '@/contexts/locale'
import { Languages } from 'lucide-react'
import React from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes'
import { useWebSettings } from '@/contexts/website-settings'
import { cn } from '@/lib/utils'

const Options = () => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 right-5 lg:right-0 flex gap-8 backdrop-blur-md px-1 py-1 rounded-2xl z-40'>
        <LanguageSelection/>
        <ThemeSelection/>
    </div>
  )
}

const LanguageSelection = ()=>{
  const {language, changeLanguage} = useLanguage()
  const {settingsTextColor} = useWebSettings()

  return <DropdownMenu>
  <DropdownMenuTrigger className='cursor-pointer' onChange={(e)=>console.log(e)}>
    <Button variant="ghost" size="icon" className="cursor-pointer">
        <MUIBadge content={<span className='text-xs'>
            {language}
        </span>}>
            <Languages className={settingsTextColor} size={27}/>
        </MUIBadge>
    </Button>
    
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={()=>changeLanguage("PT")}>PT</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>changeLanguage("EN")}>EN</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}

const ThemeSelection = () => {
  const { setTheme, theme} = useTheme()
  const {settingsTextColor} = useWebSettings()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="cursor-pointer hove:text-foreground">
            <Sun size={27} className={cn("scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90", settingsTextColor)} />
            <Moon size={27} className={cn("absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0", settingsTextColor)} />
            <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
         <DropdownMenuItem onClick={() => setTheme("light")}>
          {theme === "light" && <div className='w-2 h-2 bg-primary rounded-full'></div>} Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {theme === "dark" && <div className='w-2 h-2 bg-primary rounded-full'></div>} Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {theme === "system" && <div className='w-2 h-2 bg-primary rounded-full'></div>} System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Options
