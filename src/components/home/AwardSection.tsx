"use client"
import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useLanguage } from "@/contexts/locale";
import { useDataFetch } from "@/hooks/useDataFetch";
import { getData } from "@/actions/home";
import LoadingPage from "@/app/components/LoadingPage";
import { cn } from "@/lib/utils";
import HeaderTitle from "@/app/components/HeaderTitle";
import ComponentCarousel from "@/components/ui/component-carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { sectionClassName } from "./constants";

const AwardSection = () => {
    const { maxWidth } = useWindowSize()
    const { language } = useLanguage()
    const { data, loading } = useDataFetch(getData, "Awards")

    if (!data || data.length === 0) return null;
    return <LoadingPage id="sustainability" loading={loading}>

        <section id="awards" style={{ maxWidth }} className={cn(
            sectionClassName,
            "flex flex-col items-start gap-10 max-lg:p-5 min-h-screen max-lg:h-auto "
        )}>
            <HeaderTitle title={language === "EN" ? "Acknolegments" : "Reconhecimento"} size={10} />

            <ComponentCarousel>
                {data.sort((a, b) => b.order! - a.order!).map((award, index) => {
                    return <CarouselItem key={index} className="flex flex-col gap-20 h-full justify-center ">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10 ">
                            <div className="flex flex-col gap-5 justify-between pb-5 w-full lg:w-[calc(100%-430px)] relative">
                                <div className="flex flex-col gap-5 w-full">
                                    <AwardTitleComponent title={award.title} date={award.date!} icon={award.icon![0].url} />
                                    <p className="text-justify text-sm lg:text-base">{award.desc}</p>
                                </div>
                                <div className="w-full text-end hidden lg:block">
                                    <Link target="__blank" className="underline" href={award.link as string}>{language === "EN" ? "More information" : "Saber mais"}</Link>
                                </div>
                            </div>
                            <div className="rounded-4xl flex-shrink-0 flex justify-end items-start p-5 w-full lg:w-[400px] h-56 lg:h-[400px]" style={{
                                backgroundImage: `url("${award.picture![0].url}")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}>
                                {award.place && <Badge>{award.place}</Badge>}
                            </div>
                        </div>
                    </CarouselItem>
                }
                )}
            </ComponentCarousel>

        </section>
    </LoadingPage>
}

type TAwardTitleProps = {
    icon: string,
    title: string,
    date: string
}

const AwardTitleComponent = ({ icon, title, date }: TAwardTitleProps) => {
    return <div className="flex gap-5 flex-shrink-0 w-full">
        <Image className="w-7 h-7 lg:w-14 lg:h-14 flex-shrink-0" src={icon} width={50} height={0} alt={title} />
        <div className="flex flex-col w-full">
            <h3 className="text-lg lg:text-2xl font-bold w-full text-wrap">{title}</h3>
            <span className="text-xs lg:text-base text-muted-foreground">{date}</span>
        </div>
    </div>
}

export default AwardSection;
