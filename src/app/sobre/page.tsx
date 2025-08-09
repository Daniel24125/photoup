"use client"
import NavWhiteHeader from '@/components/NavWhiteHeader'
import useWindowSize from '@/hooks/useWindowSize'
import React from 'react'

const AboutPage = () => {
  return (
    <section>
       <Header />
    </section>
  )
}

const Header = ()=>{
  const {maxWidth} = useWindowSize()


  return (
    <NavWhiteHeader 
      changeNavigationTextColor={true}
      style={{
        backgroundImage: 'url(/about/about_header.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="flex flex-col items-center justify-center h-screen w-screen after:w-full after:h-full after:z-0 after:absolute after:top-0 after:left-0 after:bg-black/50"
    >
      <div style={{maxWidth}} className='p-10 gap-5 z-10 w-full h-full flex flex-col items-end justify-center text-end'>
        <h1 className="mt-50 text-9xl font-bold mb-4 text-white">SUSTAINABILITY</h1>
        <p className="text-9xl font-bold text-teal-400">REIMAGINED</p>
      </div>
    </NavWhiteHeader>
  )
}

export default AboutPage
