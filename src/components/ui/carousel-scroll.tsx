import { cn } from '@/lib/utils'
import React from 'react'

type CarouselProps = {
    children: React.ReactNode
}

const CarouselScroll = ({
    children
}: CarouselProps) => {
    const [current, setCurrent] = React.useState(0)
    
   if(!children || !Array.isArray(children)) return 
    return (
        <>
            {children}
            <div className='flex flex-col gap-3 m-2 fixed right-10 top-1/2 -translate-y-1/2'>
                {children.map((el, index) =>{
                    return <div
                        onClick={()=>setCurrent(index)}
                        className={cn(
                            "rounded-full w-4 h-4 bg-neutral-500 cursor-pointer",
                            index === current ? " outline-1 outline-offset-4 outline-teal-400": ""
                        )}></div>
                })}
            </div>
        </>
    )
}

export default CarouselScroll
