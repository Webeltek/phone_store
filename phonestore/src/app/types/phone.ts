import { Message } from "./message";
import { User } from "./user";

export interface Phone {
    _id: string,
    model: string,
    screenSize: string,
    description: string,
    price: number,
    image: string,
    orderList: string[],
    owner: User,
    msgList: Message[]
}