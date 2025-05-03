import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { ChatRoom, Message } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UploadService } from './upload.service';
import * as firebase from 'firebase';
import { GptService } from './gpt.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly GPT_USER = {
    uid: 'gpt',
    username: 'gpt',
    photoUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkjcFoADXGfO6r-rGC_LSR-dw_YmwoYjgjuQ&s',
  };

  constructor(
    private _db: AngularFirestore,
    private authService: AuthService,
    private uploadService: UploadService,
    private gptService: GptService
  ) {}

  private saveMessage = (roomId: string, msg: Message) => {
    this._db.collection('rooms').doc(roomId).collection('messages').add(msg);
  };

  public getRooms = (): Observable<ChatRoom[]> => {
    return this._db
      .collection('rooms')
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            const id = snap.payload.doc.id;
            const room = snap.payload.doc.data() as ChatRoom;
            return { ...room, id } as ChatRoom;
          })
        )
      );
  };

  public getRoomMessages = (roomId: string): Observable<Message[]> => {
    return this._db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            const id = snap.payload.doc.id;
            const msg = snap.payload.doc.data() as Message;
            return { ...msg, id } as Message;
          })
        )
      );
  };

  public addRoom = (roomName: string) => {
    const loggedUser = this.authService.getUserId();
    if (loggedUser)
      this._db
        .collection('rooms')
        .add({ name: roomName || 'unnamed room', roomOwnerId: loggedUser });
  };

  public addMeasseageToRoom = (
    roomId: string,
    content: string,
    file: File | null | undefined
  ) => {
    const loggedUser = this.authService.getUserData();
    if (loggedUser) {
      const msg = {
        sender: {
          uid: loggedUser.uid,
          username: loggedUser.displayName,
          photoUrl: loggedUser.photoURL,
        },
        timestamp: new Date().getTime(),
        body: content,
      } as Message;

      if (file) {
        this.uploadService.uploadFile(file).subscribe({
          next: (url) => {
            const f = {
              url,
              name: file.name,
              type: file.type,
            };
            this.saveMessage(roomId, { ...msg, file: f });
          },
          error: (err) => {
            console.error('Error uploading file:', err);
          },
        });
      } else this.saveMessage(roomId, msg);

      if (roomId === '0chat') {
        this.gptService
          .askGpt(content, loggedUser.uid)
          .subscribe((response) => {
            const gptMessage = {
              body: response,
              sender: this.GPT_USER,
              timestamp: new Date().getTime(),
            } as Message;
            this.saveMessage(roomId, gptMessage);
          });
      }
    }
  };

  public updateReactionToMessage = async (
    roomId: string,
    messageId: string,
    emoji: string,
    isExist: boolean
  ) => {
    const loggedUser = this.authService.getUserData();
    if (loggedUser) {
      const messageRef = this._db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(messageId);
      if (messageRef) {
        await messageRef.set(
          {
            reactions: {
              [emoji]: isExist
                ? firebase.default.firestore.FieldValue.arrayRemove(
                    loggedUser.uid
                  )
                : firebase.default.firestore.FieldValue.arrayUnion(
                    loggedUser.uid
                  ),
            },
          },
          { merge: true }
        );
      }
    }
  };
}
