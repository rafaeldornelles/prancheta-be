import { RefreshToken } from "../model/refreshtoken.interface"
import { refreshTokenModel } from "../model/schema/refreshtoken.model"

export class RefreshTokenRepository {
    static async insert(refreshToken: RefreshToken) : Promise<RefreshToken> {
        return refreshTokenModel.create(refreshToken)
    }

    static async findByEmailAndRemove(email:string): Promise<RefreshToken|null> {
        return refreshTokenModel.findOneAndRemove({email: email}).exec()
    }

    static async findByEmail(email:string): Promise<RefreshToken|null> {
        return refreshTokenModel.findOne({email: email}).exec()
    }
}