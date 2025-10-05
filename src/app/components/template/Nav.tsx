"use client"
import { LogoIconBlack, LogoIconWhite } from '@/components/Icons'
import { useLanguage } from '@/contexts/locale'
import Link from 'next/link'
import React, { useState } from 'react'
import Options from './Options'
import useWindowSize from '@/hooks/useWindowSize'
import { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import { useWebSettings } from '@/contexts/website-settings'
import { useTheme } from 'next-themes'
import HamburgerButton from '../HamburgerMenu'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { LogoBlack, LogoWhite } from '@/components/Logos'
import { Button } from '@/components/ui/button'
import { Hamburger, HamburgerIcon, Menu, X } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'



const Nav = () => {

    return (<nav className="fixed top-3 px-3 lg:p-0 lg:top-6 z-50 w-full flex lg:justify-center items-center max-w-7xl mx-auto">
        <MobileMenu />
        <div style={{
                border: "2px solid rgba(255, 255, 255, 0.18)"
        }} className='flex gap-4 backdrop-blur-md px-5 py-3 rounded-2xl max-lg:hidden'>
            <RouterLinks/>
        </div>
        <Options/>
    </nav>)
}

const RouterLinks = ({showIcon=true}: {showIcon?: boolean})=>{
    const {width} = useWindowSize()
    const {navigationTextColor} = useWebSettings()
    const { resolvedTheme} = useTheme()
    const {language} = useLanguage()
    
    const isLogoWhite = React.useMemo(()=>{
        return navigationTextColor === "text-white" || resolvedTheme !== "light"
    }, [navigationTextColor, width, resolvedTheme])
    const linkClass:  ClassValue = React.useMemo(()=>{
        return cn(
           "hover:text-primary duration-200",
           navigationTextColor
        )
    }, [navigationTextColor])

    return <>
        <Link  className={linkClass} href="/">Home</Link>
        <Link  className={linkClass} href="/sobre">{language ==="PT"?"Sobre Nós": "About Us"}</Link>
        {showIcon && <Link  className={linkClass} href="/">{!isLogoWhite  ? <LogoIconBlack width={32} height={32}/>: <LogoIconWhite width={32} height={32}/>}</Link>}
        <Link  className={linkClass} href="/servicos">{language ==="PT"?"Serviços": "Services"}</Link>
        <Link  className={linkClass} href="/contactos">{language ==="PT"?"Contactos": "Contacts"}</Link>
    </>
}

const MobileMenu = ()=>{
    const [open, setOpen] = useState(false)
    const { resolvedTheme} = useTheme()
    const {language} = useLanguage()
    return <>
    {/* <HamburgerButton onToggle={(isOpen =>setOpen(isOpen))}/> */}
    <Menu onClick={()=>setOpen(true)} />
  
    <Drawer onClose={()=>setOpen(false)} open={open}>
        <DrawerContent>
           
            <div className='flex flex-col w-full items-center gap-5 my-10'>
                <RouterLinks showIcon={false}/>
            </div>
       
        <DrawerFooter className="pt-2 w-full flex items-center">
            {resolvedTheme === "light" ? <LogoBlack width={100}/> : <LogoWhite width={100}/>}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </>
}
export default Nav
