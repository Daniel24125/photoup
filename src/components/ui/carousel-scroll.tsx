import { useLoader } from '@/contexts/loader'
import { useWebSettings } from '@/contexts/website-settings'
import useEventListener from '@/hooks/useEventListener'
import useWindowSize from '@/hooks/useWindowSize'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type CarouselProps = {
    children: React.ReactNode
}

const CarouselScroll = ({
    children
}: CarouselProps) => {
    const [current, setCurrent] = React.useState(0)
    const [isBusy, setIsBusy] = React.useState(false)
    const {height} = useWindowSize()
    const isChildrenValid = React.Children.count(children) > 0 && Array.isArray(children)
    const searchParams = useSearchParams()
    const { isAllLoaded } = useLoader();
    
    useEffect(()=>{
        if(isAllLoaded){
            const scrollPositionParam = Number(searchParams.get("pos"))
            if(scrollPositionParam){
                handleScrollToSection(scrollPositionParam)
                setCurrent(scrollPositionParam)

            }
        }
    },[searchParams, isAllLoaded])

    useEventListener("wheel", (e) => {
        if(isBusy || !isChildrenValid) return
        let alpha = -1
        if (e.deltaY > 0) {
            setCurrent(prev=> prev < children.length-1 ? prev+1 : children.length-1)
            alpha = 1
        } else if (e.deltaY < 0) {
            setCurrent(prev=> prev > 0 ? prev-1 : 0)
        }
        handleScrollToSection(current + alpha)
        handleBusyOnUserInteraction()  
    })
    const handleBusyOnUserInteraction = React.useCallback(() => {
        setIsBusy(true)
        setTimeout(() => {
            setIsBusy(false)
        }, 1000) // Simulate a delay for the transition
    }, []);

    const handleScrollToSection = React.useCallback((index: number) => {
        const targetY = height * (index); 
        window.scrollTo({
            top: targetY,
            left: 0,
            behavior: 'smooth'
        });
    }, [height]);

    if (!isChildrenValid) {
        console.error("CarouselScroll requires an array of children components.");
        return null;
    }

    return (
        <>
            {children}
            <div className='flex flex-col gap-3 m-2 fixed right-10 top-1/2 -translate-y-1/2 z-20'>
                {children.map((el, index) =>{
                    return <div
                        key={`dot-cs-${index}`}
                        onClick={()=>{
                            if(!isBusy && index !== current) {
                                setCurrent(index)
                                handleBusyOnUserInteraction()
                                handleScrollToSection(index)
                            }
                        }}
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
