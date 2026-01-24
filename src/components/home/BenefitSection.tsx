"use client"
import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useLanguage } from "@/contexts/locale";
import { cn } from "@/lib/utils";
import HeaderTitle, { HeaderTitleDevisor } from "@/app/components/HeaderTitle";
import Image from "next/image";
import { sectionClassName } from "./constants";

const BenefitSection = () => {
    const { language } = useLanguage()
    const size = React.useMemo(() => 10, [])
    const { width, maxWidth } = useWindowSize()

    return <section style={{ maxWidth }} className={cn(
        sectionClassName,
        "flex items-center"
    )}>
        <div className="flex justify-between w-full gap-10 pr-16">
            <div className="flex flex-col gap-5 w-1/2 h-full justify-evenly">
                <HeaderTitle title={language === "EN" ? "Benefits" : "Benefícios"} size={size} />
                <p className="text-justify h-56">
                    {language === "EN" ?
                        "PhotoUP is dedicated to establishing strict and close partnerships with all its contacts. This allows us to build a stronger and more consistent connection with our customers. With our product, it's possible to give value to a byproduct of the organic waste treatment industry and convert it into an additional source of income: biomethane. We also provide an additional source of income through the sale of microalgae and reduce operating costs by up to 80%." :
                        "A PhotoUP dedica-se a estabelecer parcerias com todos os seus contactos. Assim conseguimos uma ligação mais forte e duradoura com os nossos clientes. Com o nosso produto, é possível valorizar um subproduto da indústria de tratamento de resíduos orgânicos e transformá-lo numa fonte extra de rendimento, o biometano. Adicionalmente, permitimos uma fonte extra de rendimento, com a comercialização de microalgas assim como reduzimos até 80% dos custos operacionais."
                    }
                </p>
                <HeaderTitleDevisor size={size} />
            </div>
            <Image src="/benefits.png" width={width / 2 > 500 ? 500 : width / 2} height={0} alt="Imagem Benefícios" />
        </div>
    </section>
}

export default BenefitSection;
