import { sign } from "jsonwebtoken"
import { UserRepository } from "../repository/user.repository";
import { briefingDocument } from "../model/schema/briefing.model";
import { projectDocument } from "../model/schema/project.model";
import { BriefingRepository } from "../repository/briefing.repository";
const moment = require("moment")
const nodemailer = require("nodemailer") 

export class EmailBusiness {
    static async sendBriefingEmail( briefing: briefingDocument) {
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

    static async sendProjectStartedEmail(project: projectDocument) {
      const sender = await UserRepository.findUserById(project.user as string)
      const briefing = await BriefingRepository.findById(project.briefing as string)

      if (sender && briefing) {
        const projectKey = this.generateProjectKey(project._id)
        const subject = `Seu projeto com ${sender.firstName} ${sender.lastName} foi iniciado!`

        const message = `
        <h3>Projeto Iniciado!</h3>
        <p>Olá, ${briefing.client.name}!</p>
        <p>Estamos muito felizes em informar que o seu projeto, ${project.name}, com ${sender.firstName} ${sender.lastName} foi iniciado em ${ moment(project.createdAt).format("L") }</p>
        <p>O prancheta permite que você acompanhe a evolução do seu projeto em diferentes etapas.</p>
        <p>Basta clicar no link abaixo para acessar o seu projeto</p>
        <a href="${process.env.FRONTEND_BASE_URL}/client/project?key=${projectKey}">Acessar</a> 
        `
        
        this.sendEmail(briefing.client.email, subject, message)
      }
    }

    static async sendProjectVisitationEmail(project: projectDocument) {
      const sender = await UserRepository.findUserById(project.user as string)
      const briefing = await BriefingRepository.findById(project.briefing as string)

      if (sender && briefing) {
        const projectKey = this.generateProjectKey(project._id)
        const subject = `Atualização no seu projeto com ${sender.firstName} ${sender.lastName}!`

        const message = `
        <h3>Visita à obra adicionada!</h3>
        <p>Olá, ${briefing.client.name}!</p>
        <p>Seu projeto, ${project.name}, com ${sender.firstName} ${sender.lastName} foi atualizado em ${ moment(project.createdAt).format("L") } com uma visita à obra.</p>
        <p>Para verificar os detalhes, basta clicar no link abaixo para acessar o seu projeto</p>
        <a href="${process.env.FRONTEND_BASE_URL}/client/project?key=${projectKey}">Acessar</a> 
        `
        
        this.sendEmail(briefing.client.email, subject, message)
      }
    }

    static async sendFeedbackRequestEmail(project: projectDocument) {
      const sender = await UserRepository.findUserById(project.user as string)
      const briefing = await BriefingRepository.findById(project.briefing as string)

      if (sender && briefing) {
        const projectKey = this.generateProjectKey(project._id)
        const subject = `Projeto Concluído!`

        const message = `
        <h3>Olá, ${briefing.client.name}!</h3>
        <p>Seu projeto, ${project.name}, com ${sender.firstName} ${sender.lastName} marcado como concluído. Esperamos que tenha dado tudo certo com tudo.</p>
        <p>Caso deseje deixar um feedback sobre o que você achou do processo e do resultado final, deixamos um link abaixo. Esperamos ver você em breve!</p>
        <a href="${process.env.FRONTEND_BASE_URL}/client/project-feedback?key=${projectKey}">Deixar um Feedback</a> 
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

    private static generateProjectKey(projectId: string) {
      return sign( {
        "projectId": projectId,
        "expiresIn":  2592000 //30*24*60*60
      }, process.env.JWT_EMAIL_SECRET as string)
    }
}