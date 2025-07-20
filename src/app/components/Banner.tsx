import { LogoTextWhite } from '@/components/Logos';
import { BannerMask } from '@/components/Masks';
import { Button } from '@/components/ui/button';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import React from 'react';

const Banner = ()=>{
    const { width} = useWindowSize();

    const viewBoxWidth = 1301;
    const viewBoxHeight = 877;


    return  <>
        <BannerMask viewBoxWidth={viewBoxWidth} viewBoxHeight={viewBoxHeight}/>
        <div className={`w-full h-full relative overflow-hidden landingpage-clip`} 
            style={{
                clipPath: width > 1024 ? 'url(#roundedTabMask)': "",
                WebkitClipPath: width > 1024 ? 'url(#roundedTabMask)': "",
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
                    clipPath: width > 1024 ? 'url(#roundedTabMask)': "",
                    WebkitClipPath: width > 1024 ? 'url(#roundedTabMask)': "",
                }}
            />
            <div className='absolute top-1/2 -translate-y-1/2 z-10 left-14 flex flex-col gap-5'>
                <LogoTextWhite width={600}/>
                <h4 className='text-5xl text-white'>Sustainability, Reimagined</h4>
                <div className="flex gap-2">
                    <Link href="/contactos">
                        <Button className=' cursor-pointer' variant="secondary">Contacte-nos</Button>
                    </Link>
                    <Link href="servicos">
                        <Button className=' cursor-pointer'>Serviços</Button>
                    </Link>
                </div>
            </div>
            
        </div>

    </>
}
export default Banner;  