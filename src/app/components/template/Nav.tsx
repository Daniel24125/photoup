"use client"
import { LogoIconBlack, LogoIconWhite } from '@/components/Icons'
import { useLanguage } from '@/contexts/locale'
import Link from 'next/link'
import React from 'react'
import Options from './Options'
import useWindowSize from '@/hooks/useWindowSize'

const linkClass:  React.ComponentProps<'div'>['className'] = "hover:text-primary duration-200 text-white lg:text-foreground  "

const Nav = () => {
    const {language} = useLanguage()
    const {width} = useWindowSize()
    
    return (<nav className="fixed top-6 z-50 w-full flex justify-center items-center max-w-7xl mx-auto">
        <div style={{
                border: "2px solid rgba(255, 255, 255, 0.18)"
        }} className='flex gap-4 backdrop-blur-md px-5 py-3 rounded-2xl '>
            <Link className={linkClass} href="/">Home</Link>
            <Link className={linkClass} href="/sobre">{language ==="PT"?"Sobre Nós": "About Us"}</Link>
            <Link className={linkClass} href="/">{width > 1024 ? <LogoIconBlack width={32} height={32}/>: <LogoIconWhite width={32} height={32}/>}</Link>
            <Link className={linkClass} href="/servicos">{language ==="PT"?"Serviços": "Services"}</Link>
            <Link className={linkClass} href="/contactos">{language ==="PT"?"Contactos": "Contacts"}</Link>
        </div>
        <Options/>
    </nav>)
}

export default Nav
