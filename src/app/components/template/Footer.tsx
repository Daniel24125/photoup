"use client"

import { getData } from '@/actions/home';
import { LogoBlack } from '@/components/Logos';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/locale';
import { useDataFetch } from '@/hooks/useDataFetch';
import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const footerColor= "bg-teal-200"

const Footer = () => {
  const { maxWidth} = useWindowSize();
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Contacts")

  if(loading) return "Loading..."

  if(!data || data.length === 0) return null;

  const addressData = data[0]

  return (    
    <footer className={cn('w-full flex justify-center p-10 z-0 mt-52', footerColor)}>
      <div style={{maxWidth}} className='w-full flex-col'>
        <LogoBlack width={140}/>
        <div className='mt-16 flex justify-between'>
          <FooterNavComponent
            sectionTitle={{
              title:"HOME",
              link: "/"
            }}
            navItems={[
              {
                title: language === "EN" ? "The System": "O Sistema",
                link: "/?scrollTo=system"
              },
              {
                title: language === "EN" ? "Why us": "Benefícios",
                link: "/?scrollTo=benefits"
              },
              {
                title: language === "EN" ? "Sustainability": "Sustentabilidade",
                link: "/?scrollTo=sustainability"
              },
              {
                title: language === "EN" ? "Awards": "Participações",
                link: "/?scrollTo=awards"
              }
            ]}
          />
           <FooterNavComponent
            sectionTitle={{
              title: language === "EN" ? "ABOUT US": "SOBRE NÓS",
              link: "/sobre"
            }}
            navItems={[
              {
                title: language === "EN" ? "Our History": "A Nossa História",
                link: "/sobre?scrollTo=history"
              },
              {
                title: language === "EN" ? "Our Values": "Os Nossos Valores",
                link: "/sobre?scrollTo=values"
              },
              {
                title: language === "EN" ? "Our Team": "A Equipa",
                link: "/sobre?scrollTo=team"
              },
            ]}
          />
           <FooterNavComponent
            sectionTitle={{
              title: language === "EN" ? "SERVICES": "SERVIÇOS",
              link: "/servicos"
            }}
            navItems={[]}
            // navItems={[
            //   {
            //     title: language === "EN" ? "Biogas Upgrade": "Upgrade de Biogás",
            //     link: "/servicos?scrollTo=biogasUpgrade"
            //   },
            //   {
            //     title: language === "EN" ? "Potential Assessment": "Avaliação de Potencial",
            //     link: "/servicos?scrollTo=assessment"
            //   },
            //   {
            //     title: language === "EN" ? "Monitoring System": "Sistemas de Monitorização",
            //     link: "/servicos?scrollTo=monitoring"
            //   }
            // ]}
          />
          <FooterNavComponent
            sectionTitle={{
              title: language === "EN" ? "CONTACTS": "CONTACTOS",
              link: addressData.link!,
              newWindow: true,
              
            }}
            navItems={[
              {
                title: addressData.address!,
                link: addressData.link!,
                newWindow: true,
                className: "max-w-44"
              },
              {
                title: `${addressData.addressCode!} ${addressData.city!}`,
                link: addressData.link!,
                newWindow: true
              },
              {
                title: addressData.email!,
                link: `mailto:${addressData.email}`,
                newWindow: true
              }
            ]}
          />
        </div>
        <div className='flex justify-between mt-16 items-end'>
          <span className='text-xs'>© Photoup {new Date().getFullYear()}, all rights reserved</span>
          <div className='flex gap-2'>
            <Link href={`mailto:${addressData.email!}`}>
              <Button  variant={"outline"} size={"icon"} className={cn('border-black cursor-pointer', footerColor)}>
                <Mail/>
              </Button>
            </Link>
          </div>
          <div className='flex gap-1 items-center'>
            <Link className="text-xs" href="/terms">Termos e Condições</Link>
            |
            <Link className="text-xs" href="/privacy">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>  
  )
}

type TNavItem = {
  title: string 
  link: string,
  newWindow?: boolean,
  className?: string
}

type FooterNavComponentProps = {
  sectionTitle: TNavItem
  navItems: TNavItem[],
  
}

const FooterNavComponent = ({
  sectionTitle, 
  navItems
}: FooterNavComponentProps)=>{
  return <div className='flex flex-col gap-2'>
    <Link className='font-bold text-lg cursor-pointer' href={sectionTitle.link}>{sectionTitle.title}</Link>
    {navItems.map(ni=>{
      return <Link target={ni.newWindow ? "_blank": ""} className={
        cn('pl-5 cursor-pointer', ni.className)
      } key={ni.title} href={ni.link}>{ni.title}</Link>
    })}
  </div>
}
export default Footer
