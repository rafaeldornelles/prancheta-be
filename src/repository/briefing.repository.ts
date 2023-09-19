import { Briefing } from "../model/briefing.interface";
import { briefingModel } from "../model/schema/briefing.model";

export class BriefingRepository {
    static async listByUser(userId: string): Promise<Briefing[]>{
        return briefingModel.find({sender: userId}).exec()
    }

    static async insert(briefing: Briefing) : Promise<Briefing> {
        return briefingModel.create(briefing)
    }

    static async findById(id: string) : Promise<Briefing|null> {
        return briefingModel.findById(id).exec()
    }

    static async update(id: string, briefing: Briefing): Promise<Briefing|null> {
        await briefingModel.findByIdAndUpdate(id, briefing).exec()
        return briefing
    }
}