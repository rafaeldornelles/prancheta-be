import { sign } from "jsonwebtoken"
import { UserRepository } from "../repository/user.repository";
import { briefingDocument } from "../model/schema/briefing.model";
const nodemailer = require("nodemailer") 

export class EmailBusiness {
    static async sendBriefingEmail(userId: string, briefing: briefingDocument) {
      const sender = await UserRepository.findUserById(briefing.sender as string)

      if (sender) {
        const briefingKey = this.generateBriefingKey(briefing._id)
        const subject = `${sender.firstName} ${sender.lastName} te enviou um questionário de Briefing`

        const message = `
        <h3>Formulário de Briefing</h3>
        <p>Olá, ${briefing.client.name}!</p>
        <p>O Briefing é a primeira etapa para iniciar o seu projeto dos sonhos e é muito importante para que entendamos exatamente quais são as suas expectativas e desejos.</p>
        <p>Por isso, elaboramos um questionário para buscar entender exatamente tudo o que você deseja ter no seu projeto.</p>
        <p>Basta clicar no link abaixo e responder às perguntas!</p>
        <a href="${process.env.FRONTEND_BASE_URL}/client/briefing?key=${briefingKey}">Responder</a> 
        `
        
        this.sendEmail(briefing.client.email, subject, message)
      }

    }


    private static transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "prancheta.app@gmail.com",
          pass: process.env.PRANCHETA_MAIL_PASS,
        },
      });
    private static async sendEmail(receiverEmail: string, subject: string, message: string) {
        await this.transporter.sendMail({
            from: '"Prancheta App" <prancheta.app@gmail.com>', // sender address
            to: receiverEmail, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: message, // html body
          });
    }

    private static generateBriefingKey(briefingId: string) {
        return sign( {
            "briefingId": briefingId,
            "expiresIn": 2592000 //30*24*60*60
        }, process.env.JWT_EMAIL_SECRET as string)
    }
}