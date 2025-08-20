"use server"

import { LanguageType } from "@/contexts/locale";
//@ts-ignore
import nodemailer from "nodemailer";

export type TFormDataResponse = {
    error: boolean, 
    msg: string
}

export type TSendEmail = (formData: FormData, language: LanguageType) => Promise<TFormDataResponse>;
type TNotifyTeam = (email: string, name: string, message: string) => Promise<{
    rejected: string[]
}>


const notifyTeam: TNotifyTeam = async (email, name, message)=>{
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp-pt.securemail.pro",
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASS, 
        },
    });
    return await transporter.sendMail({
        from: `${name} <${process.env.SMTP_USER}>`, 
        to: process.env.SEND_EMAIL_TO,
        replyTo: email,              // user’s email

        subject: "📩 New Contact Form Message",
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
    });
}



export const  sendEmail:TSendEmail = async (formData, language) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const message = formData.get("message") as string;
        
            if (!name || !email || !message) {
                throw new Error(language === "EN"? "Please fill all the required form fields.": "Preenche por favor todos os campos to formulário" );
            }                

            const res = await notifyTeam(email, name, message)
            if (res.rejected.length > 0) {
                throw new Error(language === "EN" ? "The email was rejected by the server. Please send a direct email to info@photoup.pt and we will try to help you as soon as possible": "Ocorreu um problema a tentar enviar a sua mensagem. Por favor envie um email para info@photoup.pt e tentaremos ajudar o mais rapidamente possível.")
            }

            resolve({
                error: false, 
                msg: language === "EN" ? "Thank you for contacting us. We will be in touch as soon as possible.": "Muito obrigado pelo seu contacto. Vamos tentar responder o mais rapidamente possível. "
            })
        } catch (error) {
            let message
            if (error instanceof Error) {
                message = error.message;
                console.error("Error trying to send contact from client:", error.message);
            } else {
                message = error;
                console.error("Error trying to send contact from client:", error);
            }
            resolve({
                error: true, 
                msg: message as string
            });
        }
    })
    
}