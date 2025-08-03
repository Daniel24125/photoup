import useWindowSize from '@/hooks/useWindowSize'
import { cn } from '@/lib/utils'
import React from 'react'

type CarouselProps = {
    children: React.ReactNode
}

const ComponentCarousel = ({
    children
}: CarouselProps) => {
    const [current, setCurrent] = React.useState(0)
    const [isBusy, setIsBusy] = React.useState(false)
    const {width, height, maxWidth} = useWindowSize()
    const scrollRef = React.useRef<HTMLDivElement>(null)


    const isChildrenValid = React.Children.count(children) > 0 && Array.isArray(children)
    if (!isChildrenValid) {
        console.error("CarouselScroll requires an array of children components.");
        return null;
    }
    
    const handleBusyOnUserInteraction = React.useCallback(() => {
        setIsBusy(true)
        setTimeout(() => {
            setIsBusy(false)
        }, 1000) // Simulate a delay for the transition
    }, []);
    
       const handleScrollToSection = React.useCallback((index: number) => {
            const targetY = width * (index); 
            // scrollRef.scrollTo({
            //     top: targetY,
            //     left: 0,
            //     behavior: 'smooth'
            // });
            console.log(scrollRef)
        }, [width]);
    
    

    return (
        <div className='w-full flex flex-col items-center '>
            <div style={{
                height: height*0.8,
                maxWidth
            }} ref={scrollRef} className='w-full overflow-hidden flex'>
                <div className='flex ' style={{
                    width: width*children.length
                }}>
                    {children}
                </div>
            </div>
            <div className='w-full justify-center flex items-center gap-3 m-2'>
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
                            "rounded-full w-4 h-4  cursor-pointer",
                            index === current ? "  bg-teal-400": "bg-neutral-500"
                        )}></div>
                })}
            </div>
        </div>
    )
}

export default ComponentCarousel
