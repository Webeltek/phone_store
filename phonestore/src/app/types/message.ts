import { Phone } from "./phone";
import { User } from "./user";

export interface Message {
    _id: string,
    text: string,
    authorId: User,
    phoneId: string,
    created_at: string,
    updatedAt: string,
    __v: number
}