import { cn } from '@/lib/utils'
import React from 'react'
import { Carousel,type CarouselApi, CarouselContent, CarouselNext, CarouselPrevious } from './carousel'

type CarouselProps = {
    children: React.ReactNode,
}

const ComponentCarousel = ({
    children, 
}: CarouselProps) => {
    const [current, setCurrent] = React.useState(0)
    const [api, setApi] = React.useState<CarouselApi>()
    const [count, setCount] = React.useState(0)

    console.log(current)
    const isChildrenValid = React.Children.count(children) > 0 && Array.isArray(children)
    if (!isChildrenValid) {
        console.error("CarouselScroll requires an array of children components.");
        return null;
    }
     React.useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api])
    const scrollTo = React.useCallback((index: number) => {
        api?.scrollTo(index);
    }, [api])

    return (<div className='w-full flex flex-col gap-5 max-w-7xl'>
    
        <Carousel setApi={setApi} className="w-full" opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent>
                {children}
            </CarouselContent>
            <div className='w-full justify-center flex items-center gap-3 m-2 pt-5'>
                {children.map((el, index) =>{
                    return <div
                    
                        onClick={() => scrollTo(index)}
                        className={cn(
                            "rounded-full w-4 h-4  cursor-pointer",
                            index + 1 === current ? "  bg-teal-400": "bg-neutral-500"
                        )}
                    ></div>
                })}
            </div>
        </Carousel>

    </div>)
}

export default ComponentCarousel
