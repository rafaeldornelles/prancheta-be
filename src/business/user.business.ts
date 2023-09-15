import { User } from "../model/user.interface";
import {hash} from "bcrypt"
import { UserRepository } from "../repository/user.repository";

export class UserBusiness {
    static async register(user: User) {
        console.log(user)
        user.password = await hash(user.password, 10)
        return await UserRepository.register(user)
    }
}