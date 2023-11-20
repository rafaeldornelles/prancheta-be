import { Briefing } from "../model/briefing.interface";
import { DefaultBriefing } from "../model/defaultbriefing.interface";
import { briefingModel } from "../model/schema/briefing.model";
import { defaultBriefingModel } from "../model/schema/defaultbriefing.model";

export class BriefingRepository {
    static async listByUser(userId: string): Promise<Briefing[]>{
        return briefingModel.find({sender: userId}).exec()
    }

    static async insert(briefing: Briefing) : Promise<Briefing> {
        return briefingModel.create(briefing)
    }

    static async findById(id: string, populateSender = false) : Promise<Briefing|null> {
        const result = briefingModel.findById(id)
        if (populateSender) {
            result.populate("sender")
        }
        return result.exec()
    }

    static async update(id: string, briefing: Briefing): Promise<Briefing|null> {
        await briefingModel.findByIdAndUpdate(id, briefing).exec()
        return briefing
    }

    static async userDefaultBriefing(uid: string): Promise<DefaultBriefing[]> {
        return defaultBriefingModel.where({user: uid}).exec()
    }

    static async defaultBriefings(): Promise<DefaultBriefing[]> {
        return defaultBriefingModel.where({user: null}).exec()
    }
    
    static async removeDefaults(uid: string) {
        return defaultBriefingModel.deleteMany({user: uid}).exec()
    }

    static async inserDefaults(dbs: DefaultBriefing[]): Promise<DefaultBriefing[]> {
        return defaultBriefingModel.create(dbs)
    }
}