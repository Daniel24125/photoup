"use client"

import React from 'react'
import Footer from '../components/template/Footer'
import useWindowSize from '@/hooks/useWindowSize'
import { useLanguage } from '@/contexts/locale'
import { useDataFetch } from '@/hooks/useDataFetch'
import { getData } from '@/actions/home'
import { useWebSettings } from '@/contexts/website-settings'

const ContactsPage = () => {
  const {setNavigationTextColor, setSettingsTextColor} = useWebSettings()
  React.useEffect(()=>{
    setNavigationTextColor("text-foreground")
    setSettingsTextColor("text-foreground")
  },[])

  return (
    <div className='h-screen w-full overflow-y-auto overflow-x-hidden '>
      <div className='flex flex-col items-center justify-center w-full'>
        <Header />
        <Footer/>
      </div>
    </div>
  )
}


const Header = ()=>{
  const {maxWidth} = useWindowSize()
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Contacts")
  
  if(loading) return "Loading..."

  if(!data || data.length === 0) return null;

  const contacts = data[0]

  return (
    <section
      style={{
        
        backgroundImage: `url(${contacts.picture![0].url})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="relative h-screen w-screen"
    >
      
    </section>
  )
}

export default ContactsPage
