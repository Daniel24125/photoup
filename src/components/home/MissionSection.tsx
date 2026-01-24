"use client"
import React, { useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useLanguage } from "@/contexts/locale";
import useOnScreen from "@/hooks/useOnScreen";
import { cn } from "@/lib/utils";
import Particles from "@/components/Particles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { sectionClassName } from "./constants";

const MissionSection = () => {
    const { maxWidth, width } = useWindowSize()
    const { language } = useLanguage()
    const ref = useRef(null)
    const isVisible = useOnScreen(ref)
    const [mission, setMission] = React.useState<string>("")

    React.useEffect(() => {
        if (language === "EN") {
            setMission("At PhotoUP, we believe that innovation and sustainability are key drivers for a better future (and planet). Our mission is to develop biological and technological solutions that combine scientific knowledge, accessibility, and positive environmental and social impact. By integrating science, technology, and nature, we can transform global challenges into opportunities for sustainable and resilient growth across various industrial sectors.")
        } else {
            setMission("Na PhotoUP, acreditamos que a inovação e a sustentabilidade são os motores para um futuro (e planeta) melhor. A nossa missão é desenvolver soluções biológicas e tecnológicas que aliam conhecimento científico, acessibilidade e impacto ambiental e social positivo. Ao integrar ciência, tecnologia e natureza, trabalhamos para transformar desafios globais em oportunidades de crescimento sustentável e resiliente em diferentes setores industriais.")
        }
    }, [language])

    return <section id="benefits" style={{ maxWidth }} className={cn(sectionClassName, "relative min-h-screen")}>
        <Particles

            particleColors={['#2AC5C1']}
            particleCount={600}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={width > 1024 ? 70 : 130}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
        />
        <div ref={ref} className="w-full max-w-4xl flex flex-wrap backdrop-blur-md justify-evenly px-5 absolute">
            {isVisible && (
                <TextGenerateEffect
                    key={language + mission}  // 👈 force remount when text OR language changes
                    delay={0.05}
                    className="text-center"
                    duration={0.5}
                    words={mission}
                />
            )}
        </div>
    </section>
}

export default MissionSection;
