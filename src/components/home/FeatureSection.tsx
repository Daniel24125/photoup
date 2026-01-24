"use client"
import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useDataFetch } from "@/hooks/useDataFetch";
import { getData } from "@/actions/home";
import FeatureComponent, { TFeature } from "@/app/components/FeatureComponent";
import LoadingPage from "@/app/components/LoadingPage";
import { cn } from "@/lib/utils";
import { sectionClassName } from "./constants";

const FeatureSection = () => {
    const { maxWidth } = useWindowSize()
    const { data, loading } = useDataFetch(getData, "Features")


    if (!data || data.length === 0) return null;

    return <LoadingPage id="benefits" loading={loading}>
        <section id="benefits" style={{ maxWidth }} className={cn(sectionClassName, "min-h-screen")}>
            <div className={cn("w-full flex flex-wrap justify-evenly px-5 ", data.length > 4 ? "" : "max-w-4xl")}>
                {data.map((f) => {
                    return f.visible && <FeatureComponent
                        key={f.id}
                        feature={f as unknown as TFeature}
                        size="md"
                    />
                })}
            </div>
        </section>
    </LoadingPage>
}

export default FeatureSection;
