import { userModel } from "../model/schema/user.model";
import { User } from "../model/user.interface";

export class UserRepository {
    static async findUserByEmail(email: string) : Promise<User | null> {
        return userModel.findOne({email: email}).exec()
    }

    static async findUserById(id: string) : Promise<User | null> {
        return userModel.findById(id).exec()
    }

    static async register(user: User) : Promise<User> {
        return userModel.create(user)
    }
}