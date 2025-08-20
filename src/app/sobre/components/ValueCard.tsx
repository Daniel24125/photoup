import { cn } from '@/lib/utils'
import { TValuesData } from '@/utils/airtable'
import React from 'react'

type TValueCardProps = {
    valueData: TValuesData
}

const ValueCard = ({
    valueData
}: TValueCardProps) => {

    return (<div className="max-w-xs w-full">
      <div
        style={{
            backgroundImage:`url(${valueData.image[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 ",
          "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-60",
          "transition-all duration-500"
        )}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {valueData.title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative my-4">{valueData.desc}</p>
        </div>
      </div>
    </div>
    )
}

export default ValueCard
