import React from 'react'


type CircularGalleryProps = {
    children: React.ReactNode,
    rotationAngle: number,
    rotationRadius: number
}

const CircularGallery = ({
    children,
    rotationAngle=15,
    rotationRadius=100
}: CircularGalleryProps) => {

    const angleRadians = React.useMemo(()=>{
        return rotationAngle*180/3.14
    }, [])

    return (
        <div className='flex gap-10 justify-center'>
            <div style={{
                transformOrigin: "center center",
                transform: `rotate(${(180-rotationAngle)/2}deg) `
            }} className='w-xs h-80 bg-red-400'></div>
            <div style={{

            }} className='w-xs h-80 bg-red-400'></div>
            <div style={{
                transform: `rotate(-${(180-rotationAngle)/2}deg) translate(${rotationRadius*Math.sin(angleRadians)}px, ${rotationRadius*(1-Math.cos(angleRadians))}px)`
            }} className='w-xs h-80 bg-red-400'></div>
        {/* {children} */}
        </div>
    )
}

export default CircularGallery
