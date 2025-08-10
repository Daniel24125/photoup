import React from 'react'


type CircularGalleryProps = {
    children: React.ReactNode,
    radius: number,
    componentDistance: number
}

const CircularGallery = ({
    children,
    radius=100,
    componentDistance=50,
}: CircularGalleryProps) => {

    const angleRadians = React.useMemo(()=>{
        return componentDistance/radius
    }, [radius, componentDistance])

    const angleDegrees = React.useMemo(()=>{
        return angleRadians*180/Math.PI
    }, [angleRadians])
    
    const tranlationX = React.useMemo(()=>{
        return radius*Math.sin(angleRadians)
    },[angleRadians, radius])

    const tranlationY = React.useMemo(()=>{
        return radius*(1-Math.cos(angleRadians))
    },[angleRadians, radius])


    console.log(angleDegrees,angleRadians, tranlationX, tranlationY)
    return (
        <div className='flex gap-10 justify-center relative'>
            <div style={{
                transform: `rotate(-${angleDegrees}deg) translate(-${tranlationX}px, ${tranlationY}px)`
            }} className='w-xs h-96 bg-red-400 absolute top-0'></div>
            <div style={{
                
            }} className='w-xs h-96 bg-red-400 absolute top-0'></div>
            <div style={{
                transform: `rotate(${angleDegrees}deg) translate(${tranlationX}px, ${tranlationY}px)`
            }} className='w-xs h-96 bg-red-400 absolute top-0'></div>
        {/* {children} */}
        </div>
    )
}

export default CircularGallery
