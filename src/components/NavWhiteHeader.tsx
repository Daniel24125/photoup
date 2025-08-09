"use client"

import { useWebSettings } from '@/contexts/website-settings'
import useOnScreen from '@/hooks/useOnScreen'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
import React from 'react'

type TNavWhiteHeadeRProps = {
    children: React.ReactNode,
    changeNavigationTextColor?: boolean,
    style?: React.CSSProperties,
    className?: ClassValue
}

const NavWhiteHeader = ({children, className, style, changeNavigationTextColor}: TNavWhiteHeadeRProps) => {
    const sectionRef = React.useRef<HTMLDivElement>(null)
    const isVisible =useOnScreen(sectionRef, "-10px")
    const {setSettingsTextColor, setNavigationTextColor} = useWebSettings()

    React.useEffect(()=>{
        if(isVisible) {
            if(changeNavigationTextColor) setNavigationTextColor("text-white")
            setSettingsTextColor("text-white") 
        } else {
            setSettingsTextColor("text-foreground")
            setNavigationTextColor("text-foreground")
        }
    },[isVisible])

    return (
        <header style={style} ref={sectionRef} className={cn(className)}>
            {children}
        </header>
    )
}

export default NavWhiteHeader
