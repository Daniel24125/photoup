"use client"

import React from 'react'
import Footer from '../components/template/Footer'
import { useLanguage } from '@/contexts/locale'
import { useDataFetch } from '@/hooks/useDataFetch'
import { getData } from '@/actions/home'
import { useWebSettings } from '@/contexts/website-settings'
import { Mail, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { sendEmail } from '@/actions/contact'
import { useFormStatus } from 'react-dom'
import { Spinner } from '@/components/ui/spinner'
import { LogoBlackPrimary, LogoWhitePrimary } from '@/components/Logos'
import { toast } from 'sonner'
import LoadingPage from '../components/LoadingPage'
import { useTheme } from 'next-themes'

const ContactsPage = () => {
  const {setNavigationTextColor, setSettingsTextColor} = useWebSettings()
  React.useEffect(()=>{
    setNavigationTextColor("text-foreground")
    setSettingsTextColor("text-foreground")
  },[])

  return (
    <div className='h-screen w-full overflow-y-auto overflow-x-hidden '>
      <div className='flex flex-col items-center justify-center w-full'>
        <Header />
        <Footer/>
      </div>
    </div>
  )
}


const Header = ()=>{
  const {language} = useLanguage()
  const {data, loading} = useDataFetch(getData, "Contacts")
  const { resolvedTheme} = useTheme()
  
  if(!data || data.length === 0) return null;

  const contacts = data[0]

  return (<LoadingPage id="contacts" loading={loading}>
    <section
      style={{
        backgroundImage: `url(${contacts.picture![resolvedTheme === "light" ? 0: 1].url})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="relative h-screen w-screen flex justify-center lg:justify-start items-center"
    >
      <div className='px-6 py-2 flex flex-col h-2/3 min-h-96 bg-background rounded-2xl border-accent lg:ml-20 overflow-y-auto'>
        <h3 className='font-bold text-2xl my-5'>{language === "EN" ? "Contacts": "Contactos"}</h3>
        <InfoComponent
          icon={<MapPin/>}
          info={<>
            <p className='text-sm'>{contacts.address}</p>
            <p className='text-sm mb-3'>{contacts.addressCode} - {contacts.city}</p>
          </>}
        />
        <InfoComponent icon={<Mail/>} info={contacts.email} />
        {/* <InfoComponent icon={<Phone/>} info={contacts.phone} /> */}
        <h6 className='font-bold text-lg mb-3'>{language === "EN" ? "Get in touch": "Entre em contacto"}</h6>
        <ContactForm/>
        <div className='w-full flex justify-center mt-7'>
          {resolvedTheme === "light" ? <LogoBlackPrimary width={100}/>: <LogoWhitePrimary width={100}/>}
        </div>
      </div>
    </section>
  </LoadingPage>
  )
}


type TInfoComponentProps = {
  icon: React.ReactNode
  info: string | React.ReactNode
}

const InfoComponent = ({info, icon}: TInfoComponentProps)=>{
  return <div className='flex mb-3'>
    <div className='w-10 h-10'>
      {icon}
    </div>
    <div className='felx flex-col text-sm'>
      {info}
    </div>
  </div>
}

const ContactForm = ()=>{
  const {language} = useLanguage()
  const [response, setResponse] = React.useState<{error: boolean, msg: string}>({error: false, msg: ""})



  const submitMessage = React.useCallback(async (formData: FormData) => {
    console.log("Submitting form data:", formData.get("name"), formData.get("email"), formData.get("message"));
    const res = await sendEmail(formData, language); 
    setResponse(res);
  }, [language])

  React.useEffect(()=>{
    console.log("Response from form submission:", response);
    if(response.msg){
      if(response.error){
        toast.error("Ocorreu um erro.", {
          description: response.msg
        }) 
      }else{
        toast.success("Mensagem enviada com sucesso!",{
          description: response.msg
        })
      } 
    }
  }, [response])

  return <form action={submitMessage} className='flex flex-col gap-5'>
    <Input required name="name" type="text" placeholder={language === "EN" ? 'Name': "Nome"}/>
    <Input required name="email" type="email" placeholder={'Email'}/>
    <Textarea required name="message" className='resize-none' rows={10}  placeholder={language === "EN" ? "Type your message here.": "Escreva aqui a sua mensagem"} />
    <SubmitButton/>
    
  </form>
}

const SubmitButton = ()=>{
  const {language} = useLanguage()
  const { pending } = useFormStatus();

  return <Button className='cursor-pointer' type="submit" disabled={pending}>
    {language === "EN" ?
      pending ? <Spinner/> : "Submit": 
      pending ? <Spinner/> : "Enviar"
    }
  </Button>

}

export default ContactsPage
