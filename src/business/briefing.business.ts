import { PranchetaError } from "../middleware/error.handler";
import { Briefing } from "../model/briefing.interface";
import { DefaultBriefing } from "../model/defaultbriefing.interface";
import { briefingDocument } from "../model/schema/briefing.model";
import { BriefingRepository } from "../repository/briefing.repository";
import { EmailBusiness } from "./email.business";

export class BriefingBusiness {
    static async listByUser(userId: string) {
        return BriefingRepository.listByUser(userId)
    }

    static async insert(briefing: Briefing, userId: string) {
        briefing.sender = userId
        const result = await BriefingRepository.insert(briefing) as briefingDocument
        await EmailBusiness.sendBriefingEmail(userId, result)
        return result
    }

    static async answer(briefingId: string, answers: string[]){
        const briefing = await BriefingRepository.findById(briefingId)
        if (briefing && answers.length <= briefing.questions.length) {
            for (let i=0; i<answers.length;i++) {
                briefing.questions[i].answer = answers[i] || briefing.questions[i].answer
            }
            briefing.answeredAt = new Date(Date.now())
            return BriefingRepository.update(briefingId, briefing)
        }
        throw new PranchetaError(400, "Parâmetros inválidos")
    }

    static async findById(briefingId: string) : Promise<Briefing> {
        const briefing = await BriefingRepository.findById(briefingId)
        if(! briefing) throw new PranchetaError(404, "briefing não encontrado")
        return briefing
    }

    static async defaultBriefings(uid: string): Promise<DefaultBriefing[]> {
        const userDefaultBriefings = await BriefingRepository.userDefaultBriefing(uid)
        if (userDefaultBriefings.length) return userDefaultBriefings
        return BriefingRepository.defaultBriefings()
    }

    static async setUserDefault(uid: string, dbs: DefaultBriefing[]): Promise<DefaultBriefing[]> {
        await BriefingRepository.removeDefaults(uid)
        for (const db of dbs) {
            db.user = uid
        }
        return BriefingRepository.inserDefaults(dbs)
    }
}