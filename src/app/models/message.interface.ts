export interface Message {
    id:string,
    sender:{
        uid:string,
        username:string,
        photoUrl:string
    },
    timestamp:number,
    body:string
}