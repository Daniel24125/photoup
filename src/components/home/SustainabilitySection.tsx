"use client"
import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useDataFetch } from "@/hooks/useDataFetch";
import { getData } from "@/actions/home";
import LoadingPage from "@/app/components/LoadingPage";
import { cn } from "@/lib/utils";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { sectionClassName } from "./constants";

const SustainabilitySection = () => {
    const { maxWidth } = useWindowSize()
    const { data, loading } = useDataFetch(getData, "Sustainable Goals")


    if (!data || data.length === 0) return null;
    return <LoadingPage id="sustainability" loading={loading}>
        <section id="sustainability" style={{ maxWidth }} className={cn(sectionClassName, "min-h-screen")}>
            <AnimatedTestimonials autoplay testimonials={data.sort((a, b) => a.order! - b.order!).map(s => {
                return {
                    quote: s.desc,
                    name: s.title,
                    designation: "",
                    // @ts-expect-error: picture exists
                    src: s.picture as string
                }
            })} />
        </section>
    </LoadingPage>
}

export default SustainabilitySection;
