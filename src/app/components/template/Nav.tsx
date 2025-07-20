"use client"
import { LogoIcon } from '@/components/Icons'
import { useLanguage } from '@/contexts/locale'
import Link from 'next/link'
import React from 'react'

const linkClass:  React.ComponentProps<'div'>['className'] = "hover:text-primary duration-200"

const Nav = () => {
        const {language, changeLanguage} = useLanguage()
    
    return (<>
    
        <nav className="fixed top-6 z-50">
            <div style={{
                    border: "2px solid  rgba(255, 255, 255, 0.18)"
            }} className='flex gap-4 backdrop-blur-md px-5 py-3 rounded-2xl '>
                <Link className={linkClass} href="/">Home</Link>
                <Link className={linkClass} href="/sobre">{language ==="PT"?"Sobre Nós": "About Us"}</Link>
                <Link className={linkClass} href="/"><LogoIcon width={32} height={32}/></Link>
                <Link className={linkClass} href="/servicos">{language ==="PT"?"Serviços": "Services"}</Link>
                <Link className={linkClass} href="/contactos">{language ==="PT"?"Contactos": "Contacts"}</Link>
            </div>
        </nav>
    </>)
}

export default Nav
