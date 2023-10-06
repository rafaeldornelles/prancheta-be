import { PranchetaError } from "../middleware/error.handler";
import { Briefing } from "../model/briefing.interface";
import { BriefingRepository } from "../repository/briefing.repository";

export class BriefingBusiness {
    static async listByUser(userId: string) {
        return BriefingRepository.listByUser(userId)
    }

    static async insert(briefing: Briefing, userId: string) {
        briefing.sender = userId
        return BriefingRepository.insert(briefing)
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
}