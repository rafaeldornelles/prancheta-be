import { User } from "../model/user.interface";
import {compare, hash} from "bcrypt"
import { UserRepository } from "../repository/user.repository";
import { PranchetaError } from "../middleware/error.handler";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { UserAuthRepository } from "../repository/userAuth.repository";

export class UserBusiness {
    static async register(user: User) {
        user.password = await hash(user.password!, 10)
        const created = await UserRepository.register(user)
        await UserAuthRepository.insert({user: created._id as string, password:user.password})
        return created
    }

    static async login(email: string, password: string): Promise<object> {
        const errorMessage = "Usuário ou senha incorretos"
        const user = await UserRepository.findUserByEmail(email)
        const auth = await UserAuthRepository.findByUser(user?._id)
        if (user && auth) {
            const matched = await compare(password, auth.password)
            if (matched) {
                return this.generateTokens(user)
            }
        }
        throw new PranchetaError(401, errorMessage)
    }

    static async refreshToken(refreshToken:string) : Promise<object> {

        const payload = verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload
        
        const userAuth = await UserAuthRepository.findByUser(payload.uid) 
        const matched = refreshToken.split(".")[1] == userAuth?.refreshToken!
        const valid = (payload.iat! + payload.expiresIn) * 1000 >= Date.now()

        if (matched && valid) {
            const user = await UserRepository.findUserById(payload.uid)
            if (user) {
                return this.generateTokens(user)
            }
        }
        throw new PranchetaError(401, "Não foi possível atualizar o token")
    }

    private static async generateTokens(user: User) {
        const token = sign({
            uid: user._id,
            expiresIn: 28800 //8*60*60
        }, process.env.JWT_SECRET!)

        const refreshToken = sign({
            uid: user._id,
            expiresIn: 86400 //24*60*60
        }, process.env.JWT_REFRESH_SECRET!)
        
        UserAuthRepository.updateRefreshToken(user._id, refreshToken.split(".")[1])
        return {token: token, refreshToken: refreshToken}
    }
}