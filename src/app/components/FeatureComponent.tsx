import { cn } from '@/lib/utils'
import React from 'react'

export type TFeature = {
        title: string
        desc: string
        id: string
        icon: string
        lenguage: string
        visible: boolean
    }

type TFeatureComponentProps = {
    feature: TFeature,
    size: "xs" | "sm" | "md" | "lg" | "xl"
}

const sizeConversion = {
    "xs": "w-7 h-7",
    "sm": "w-10 h-10",
    "md": "w-16 h-16",
    "lg": "w-20 h-20",
    "xl": "w-24 h-24",
}

const FeatureComponent = ({feature, size="md"} : TFeatureComponentProps) => {
  return (
    <div className='flex gap-5 w-sm mb-10 '>
      <div className={cn(sizeConversion[size], "flex-shrink-0 bg-teal-400 flex justify-center items-center rounded-xl")}>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(feature.icon)}`} />
      </div>
      <div className='flex flex-col mt-2'>
        <h5 className='text-xl font-bold'>{feature.title}</h5>
        <p className='text-sm'>{feature.desc}</p>
      </div>
    </div>
  )
}

export default FeatureComponent
