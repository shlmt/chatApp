import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatRoom } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _db:AngularFirestore) { }

  public getRooms=():Observable<Array<ChatRoom>>=>{
    return this._db.collection('rooms').snapshotChanges().pipe(
      map(snaps=>snaps.map(snap=>{
        const id = snap.payload.doc.id
        const data:ChatRoom = <ChatRoom>snap.payload.doc.data()
        return <ChatRoom>{
          ...data,
          id
      }}))
    )
  }
}
