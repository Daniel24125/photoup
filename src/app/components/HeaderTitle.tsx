import { cn } from '@/lib/utils';
import React from 'react'

type HeaderTitleProps = {
  title: string;  
  size: number
}

type HeaderTitleDevisor = {
     size: number, 
     reverse?: boolean, 
}


const HeaderTitle = ({title, size}:HeaderTitleProps) => {
  return (
    <div className='flex gap-2.5'>
        <div className="flex flex-col">
            <h3 className='text-7xl mb-2'>{title}</h3>
            <span style={{height: size}} className="w-full bg-foreground"></span>
        </div>
        <Dots size={size}/> 
    </div>
  )
}

export const Dots = ({size}: {size: number})=> <div className='flex gap-2.5 items-end'>
    <div style={{
        width: size, 
        height: size
    }} className="bg-foreground rounded-full"></div>
    <div style={{
        width: size, 
        height: size
    }} className="bg-foreground rounded-full"></div>
    <div style={{
        width: size, 
        height: size
    }} className="bg-foreground rounded-full"></div>
</div>

export const HeaderTitleDevisor = ({size, reverse=false}: HeaderTitleDevisor)=>{
    return <div style={{
        flexDirection: reverse ? "row-reverse": "row"
    }} className='w-full flex justify-end gap-2.5'>
        <span style={{height: size}} className="w-1/2 bg-foreground"></span>
        <Dots size={size}/>
    </div> 
}

export default HeaderTitle
