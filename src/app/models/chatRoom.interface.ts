import { Message } from "./message.interface";

export interface ChatRoom {
    id:string,
    name:string,
    roomOwnerId:string,
    messages:[Message]
}