"use client"
import { useState, useEffect } from "react"
import useEventListener from "./useEventListener"

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight }) 
  }, [])
 

  return windowSize
}