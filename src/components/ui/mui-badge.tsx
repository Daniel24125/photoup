import { cn } from '@/lib/utils'
import React from 'react'

type AnchorOriginType = {
    horizontal: "left" | "right",
    vertical: "top" | "bottom"
}

type MUIBadgePropsType = {
    children: React.ReactNode, 
    color?: "primary" | "secondary" | "destructive" | "muted",
    content?: any,
    anchorOrigin?: AnchorOriginType,
    className?: string,
    invisible?: boolean
}

const MUIBadge = ({
    children, 
    color="primary", 
    anchorOrigin = {horizontal: "right", vertical: "bottom"},
    invisible = false,
    content,
    className

}: MUIBadgePropsType) => {
  return (
    <div className='relative'>
        {children}
        <div style={{
            position: "absolute",
            [anchorOrigin.vertical]: -15,
            [anchorOrigin.horizontal]: -25
        }}  className={cn(  
            `bg-${color}`,
            "absolute transition duration-200 px-2 rounded-sm",
            className
        )}>
            {content}
        </div>
    </div>
  )
}

export default MUIBadge
