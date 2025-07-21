"use client"

import { useEffect } from "react"
import useTimeout from "./useTimeout"

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: React.DependencyList
): void {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}