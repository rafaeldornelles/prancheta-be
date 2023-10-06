import { User } from "./user.interface"

export interface UserAuth {
    refreshToken?: string
    user: User|string
    password: string
}