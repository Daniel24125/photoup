"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import MUIBadge from '@/components/ui/mui-badge'
import { useLanguage } from '@/contexts/locale'
import { Languages } from 'lucide-react'
import React from 'react'

const Options = () => {
  return (
    <div  className='absolute top-8 right-10 flex gap-4 backdrop-blur-md px-5 py-3 rounded-2xl z-50'>
            <LanguageSelection/>
    </div>
  )
}

const LanguageSelection = ()=>{
    const {language, changeLanguage} = useLanguage()

    return <DropdownMenu>
  <DropdownMenuTrigger className='cursor-pointer' onChange={(e)=>console.log(e)}>
    <MUIBadge content={<span className='text-xs'>
        {language}
    </span>}>
        <Languages className='text-white' size={27}/>
    </MUIBadge>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={()=>changeLanguage("PT")}>PT</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>changeLanguage("EN")}>EN</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    
    

}

export default Options
