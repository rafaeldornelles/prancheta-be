import { User } from "../model/user.interface";
import {compare, hash} from "bcrypt"
import { UserRepository } from "../repository/user.repository";
import { PranchetaError } from "../middleware/error.handler";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { RefreshTokenRepository } from "../repository/refreshtoken.repository";

export class UserBusiness {
    static async register(user: User) {
        user.password = await hash(user.password, 10)
        return await UserRepository.register(user)
    }

    static async login(email: string, password: string): Promise<object> {
        const errorMessage = "Usuário ou senha incorretos"
        const user = await UserRepository.findUserByEmail(email)
        if (user) {
            const matched = await compare(password, user.password)
            if (matched) {
                return this.generateTokens(user)
            }
        }
        throw new PranchetaError(401, errorMessage)
    }

    static async refreshToken(refreshToken:string) : Promise<object> {

        const payload = verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload
        const storedPayload = await RefreshTokenRepository.findByEmail(payload.email)
        const matched = await compare(refreshToken, storedPayload?.token || "")
        const valid = (payload.iat! + payload.expiresIn) * 1000 >= Date.now()

        if (matched && valid) {
            const user = await UserRepository.findUserByEmail(payload.email)
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
        await RefreshTokenRepository.findByEmailAndRemove(user.email)
        const tokenHashed = await hash(refreshToken, 10)
        RefreshTokenRepository.insert({ token: tokenHashed, email: user.email, createdAt: new Date(Date.now())})
        return {token: token, refreshToken: refreshToken}
    }
}