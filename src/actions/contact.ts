"use server"

import { LanguageType } from "@/contexts/locale";
//@ts-ignore
import nodemailer from "nodemailer";

export type TFormDataResponse = {
    error: boolean, 
    msg: string
}

export type TSendEmail = (formData: FormData, language: LanguageType) => Promise<TFormDataResponse>;

export const  sendEmail:TSendEmail = async (formData, language) => {
    return new Promise(async (resolve, reject)=>{
        try {
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const message = formData.get("message") as string;

                console.log(name, email, message)
                resolve({
                    error: false, 
                    msg: language === "EN" ? "Thank you for contacting us. Your message was successfully sent. We will be in touch as soon as possible.": "Muito obrigado pelo seu contacto. A mensagem foi enviada com sucesso. Vamos tentar responder o mais rapidamente possível. "
                })

                if (!name || !email || !message) {
                    reject({ error: true, msg: language === "EN"? "Please fill all the required form fields.": "Preenche por favor todos os campos to formulário" });
                }
                // Configure Nodemailer with Gmail SMTP
                const transporter = nodemailer.createTransport({
                    port: 465,
                    host: "smtp-pt.securemail.pro",
                    auth: {
                        user: process.env.SMTP_USER, 
                        pass: process.env.SMTP_PASS, 
                    },
                });
                // Send the email
                await transporter.sendMail({
                    from: `"${name}" <${email}>`,
                    to: process.env.SEND_EMAIL_TO,
                    subject: "📩 New Contact Form Message",
                    text: `
                        You have a new message:
                        
                        Name: ${name}
                        Email: ${email}
                        
                        Message:
                        ${message}
                    `,
                    html: `
                        <h3>New Contact Form Submission</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, "<br/>")}</p>
                    `,
                });
                resolve({
                    error: false, 
                    msg: language === "EN" ? "Thank you for contacting us. Your message was successfully sent. We will be in touch as soon as possible.": "Muito obrigado pelo seu contacto. A mensagem foi enviada com sucesso. Vamos tentar responder o mais rapidamente possível. "
                })
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error trying to send contact from client:", error.message);
                } else {
                    console.error("Error trying to send contact from client:", error);
                }
                reject({
                    error: true, 
                    msg: ""
                });
            }
    })
    
}