import { LogoIcon } from '@/components/Icons'
import Link from 'next/link'
import React from 'react'

const linkClass:  React.ComponentProps<'div'>['className'] = "hover:text-primary duration-200"

const Nav = () => {
  return (
    <nav className="fixed top-4 z-50">
      <div style={{
                border: "2px solid  rgba(255, 255, 255, 0.18)"
            }} className='flex gap-4 backdrop-blur-md px-5 py-3 rounded-2xl '>
                <Link className={linkClass} href="/">Home</Link>
                <Link className={linkClass} href="/sobre">Sobre Nós</Link>
                <Link className={linkClass} href="/"><LogoIcon width={32} height={32}/></Link>
                <Link className={linkClass} href="/servicos">Serviços</Link>
                <Link className={linkClass} href="/contactos">Contactos</Link>
            </div>
    </nav>
  )
}

export default Nav
