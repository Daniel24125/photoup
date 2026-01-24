"use client"
import React, { useEffect, useState } from "react"
import CarouselScroll from "@/components/ui/carousel-scroll";
import Footer from "@/app/components/template/Footer";
import useWindowSize from "@/hooks/useWindowSize";

// Extracted Components
import LandSection from "@/components/home/LandSection";
import MissionSection from "@/components/home/MissionSection";
import FeatureSection from "@/components/home/FeatureSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import AwardSection from "@/components/home/AwardSection";

export default function Home() {
  const { width } = useWindowSize()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Avoid hydration mismatch by rendering null until mounted (client-side only decision)
  // Note: This tradeoff implies SEO content depends on Googlebot executing JS, 
  // or we need a server-safe default. Given current architecture, this prevents layout thrashing errors.
  // However, for SEO, we should ideally render *something*. 
  // Since the previous code rendered Mobile view by default (width=0), we can stick to that 
  // or return null to ensure clean hydration. Returning null matches "Hydration Fix" best.
  if (!isMounted) return null;

  return width > 1024 ? <DesktopPageContent /> : <MobilePageContent />
}

const DesktopPageContent = () => {
  return <CarouselScroll>
    <LandSection />
    <MissionSection />
    <FeatureSection />
    <SustainabilitySection />
    <AwardSection />
    <Footer />
  </CarouselScroll>
}

const MobilePageContent = () => {
  return <div className="overflow-y-scroll h-screen w-full ">
    <LandSection />
    <MissionSection />
    <FeatureSection />
    <SustainabilitySection />
    <AwardSection />
    <Footer />
  </div>
}
