
"use client"
import { LogoWhiteVertical } from '@/components/Logos';
import { BannerMask } from '@/components/Masks';
import { useWebSettings } from '@/contexts/website-settings';
import useWindowSize from '@/hooks/useWindowSize';
import React, { useEffect, useMemo } from 'react';

const Banner = ()=>{
    const { width, height} = useWindowSize();
    const {setDarkMode, setLightMode} = useWebSettings()

    const viewBoxWidth = 1301;
    const viewBoxHeight = 877;
    const disableClipPathTh = 600

    const triggerMobile = useMemo(()=>{
        return width <= 1024 || height <= disableClipPathTh
    },[width,height])

    useEffect(()=>{
        if(triggerMobile){
           setDarkMode()
        }else{
           setLightMode()

        }
    },[triggerMobile])


    return  <>
        <BannerMask viewBoxWidth={viewBoxWidth} viewBoxHeight={viewBoxHeight}/>
        <div className={`w-full h-full relative overflow-hidden landingpage-clip`} 
            style={{
                clipPath: triggerMobile ? "":'url(#roundedTabMask)',
                WebkitClipPath: triggerMobile ? "":'url(#roundedTabMask)',
            }} 
        >   
            <video
                autoPlay
                loop
                muted
                playsInline
                src="video-bg.mp4"
                className="w-full h-full object-cover"
                style={{
                    clipPath: triggerMobile ? "":  'url(#roundedTabMask)',
                    WebkitClipPath: triggerMobile ? "":  'url(#roundedTabMask)'
                }}
            />
            <div className='absolute top-1/2 -translate-1/2 z-10 left-1/2 flex justify-center items-center gap-5'>
                <LogoWhiteVertical width={width > 1024 ? 600: 300}/>
                 {/*<LogoTextWhite width={600}/>
                <h4 className='text-5xl text-white'>Sustainability, Reimagined</h4>
                <div className="flex gap-2">
                    <Link href="/contactos">
                        <Button className=' cursor-pointer' variant="secondary">{language === "PT" ? "Contacte-nos": "Contact us"}</Button>
                    </Link>
                    <Link href="servicos">
                        <Button className=' cursor-pointer'>{language === "PT" ? "Serviços": "Services"}</Button>
                    </Link>
                </div> */}
            </div>
            
        </div>

    </>
}
export default Banner;  