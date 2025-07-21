"use client"

import useDebounce from '@/hooks/useDebounce'
import React from 'react'
import { useState } from "react"

const ServicosPage = () => {
 const [count, setCount] = useState(10)
  useDebounce(() => alert(count), 1000, [count])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}

export default ServicosPage
