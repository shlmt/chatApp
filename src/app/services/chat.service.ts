import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatRoom, Message, User } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _db:AngularFirestore, private authService:AuthService) { }

  public getRooms=():Observable<ChatRoom[]>=>{
    return this._db.collection('rooms').snapshotChanges().pipe(
      map(snaps=>snaps.map(snap=>{
        const id = snap.payload.doc.id
        const room = snap.payload.doc.data() as ChatRoom
        return {...room, id } as ChatRoom
      }))
    )
  }

  public getRoomMessages = (roomId:string) : Observable<Message[]> => {
    return this._db.collection('rooms').doc(roomId).collection('messages').snapshotChanges().pipe(
      map(snaps=>snaps.map(snap=>{
        const id = snap.payload.doc.id
        const msg = snap.payload.doc.data() as Message
        return {...msg, id } as Message
      }))
    )
  }

  public addRoom = (roomName:string) => {
    const loggedUser = this.authService.getUserData()
    if(loggedUser)
        this._db.collection('rooms').add( { roomName, roomOwnerId:loggedUser.uid } )
  }
}
