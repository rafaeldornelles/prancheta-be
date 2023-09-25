import { UserAuth } from "../model/userAuth.interface"
import { userAuthModel } from "../model/schema/userAuth.model"
import { PranchetaError } from "../middleware/error.handler"

export class UserAuthRepository {
    static async insert(userAuth: UserAuth) : Promise<UserAuth> {
        return userAuthModel.create(userAuth)
    }

    static async findByUser(user:string): Promise<UserAuth|null> {
        return userAuthModel.findOne({user: user}).exec()
    }

    static async updateRefreshToken(user: string, refreshToken: string): Promise<UserAuth|null>{
        const userAuth = await userAuthModel.findOne({user: user}).exec()
        if (userAuth) {
            userAuth.refreshToken = refreshToken
            return userAuth.save()
        }
        throw new PranchetaError(400, "não foi possível atualizar o rt")
    }
}