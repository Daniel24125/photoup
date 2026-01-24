"use client"
import React from 'react';
import useWindowSize from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import NavWhiteHeader from "@/components/NavWhiteHeader";
import Banner from "@/app/components/Banner";
import { sectionClassName } from "./constants";

const LandSection = () => {
    const { maxWidth } = useWindowSize()

    return <NavWhiteHeader style={{ maxWidth }} className={cn(sectionClassName, "h-9/12 pt-0 p-0 max-lg:mb-20 flex justify-center items-center")}>
        <Banner />
    </NavWhiteHeader>
};

export default LandSection;
