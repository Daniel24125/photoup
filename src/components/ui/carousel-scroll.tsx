import useEventListener from '@/hooks/useEventListener'
import useWindowSize from '@/hooks/useWindowSize'
import { cn } from '@/lib/utils'
import React from 'react'

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
    if (!isChildrenValid) {
        console.error("CarouselScroll requires an array of children components.");
        return null;
    }

    console.log(current, isBusy)
    useEventListener("wheel", (e) => {
        if(isBusy) return
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


    const handleBusyOnUserInteraction = () => {
        setIsBusy(true)
        setTimeout(() => {
            setIsBusy(false)
        }, 1000) // Simulate a delay for the transition
    }

    const handleScrollToSection = (index: number) => {
        const targetY = height * (index); 
        window.scrollTo({
            top: targetY,
            left: 0,
            behavior: 'smooth'
        });
    }


    return (
        <>
            {children}
            <div className='flex flex-col gap-3 m-2 fixed right-10 top-1/2 -translate-y-1/2'>
                {children.map((el, index) =>{
                    return <div
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
