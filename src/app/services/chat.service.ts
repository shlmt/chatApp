import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRoom, Message } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _db:AngularFirestore,
              private authService:AuthService,
              private uploadService:UploadService) { }

  private saveMessage = (roomId:string, msg:Message) => {
    this._db.collection('rooms').doc(roomId).collection('messages').add(msg)
  }

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
    const loggedUser = this.authService.getUserId()
    if(loggedUser)
        this._db.collection('rooms').add( { name:roomName || 'unnamed room', roomOwnerId:loggedUser } )
  }

  public addMeasseageToRoom = (roomId:string, content:string, file:File|null|undefined) => {
    const loggedUser = this.authService.getUserData()
    if(loggedUser){
      const msg = {
        sender:{
          uid: loggedUser.uid,
          username: loggedUser.displayName,
          photoUrl: loggedUser.photoURL
        },
        timestamp: new Date().getTime(),
        body:content
      } as Message

      if(file){
        this.uploadService.uploadFile(file).subscribe({
          next: url =>{
            const f = {
              url,
              name:file.name,
              type:file.type
            }
            this.saveMessage(roomId, {...msg, file:f})
          },
          error: err => {
            console.error('Error uploading file:', err)
          }
        })
      }
      else this.saveMessage(roomId,msg)
    }
  }
}
