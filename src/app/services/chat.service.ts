import { Injectable } from '@angular/core';
import { from, Observable, of, pipe } from 'rxjs';
import { ChatRoom, Message } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, timestamp } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UploadService } from './upload.service';
import * as firebase from 'firebase';
import { GptService } from './gpt.service';
import { GeminiService } from './gemini.service';
import { convertFileToBase64 } from '../utils/convert';
import { MatDialog } from '@angular/material/dialog';
import { ApiKeyDialogComponent } from '../components/api-key-dialog/api-key-dialog.component';

const GPT_USER = {
  uid: 'gpt',
  username: 'gpt',
  photoUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkjcFoADXGfO6r-rGC_LSR-dw_YmwoYjgjuQ&s',
};

const GEMINI_USER = {
  uid: 'gemini',
  username: 'gemini',
  photoUrl:
    'https://www.gstatic.com/marketing-cms/assets/images/a4/97/92c1ec494d129f3fb8d7caa91584/gemini-update.png=s48-fcrop64=1,00000000ffffffff-rw',
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private _db: AngularFirestore,
    private authService: AuthService,
    private uploadService: UploadService,
    private gptService: GptService,
    private geminiService: GeminiService,
    private dialog: MatDialog,
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
          }),
        ),
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
          }),
        ),
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
    file: File | null | undefined,
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
            alert('העלאת תמונות לא עובדת כרגע, עמך הסליחה');
            this.saveMessage(roomId, msg);
          },
        });
      } else this.saveMessage(roomId, msg);

      // if (roomId === '0chat') {
      //   this.gptService
      //     .askGpt(loggedUser.uid, content)
      //     .subscribe((response) => {
      //       const gptMessage = {
      //         body: response,
      //         sender: this.GPT_USER,
      //         timestamp: new Date().getTime(),
      //       } as Message;
      //       this.saveMessage(roomId, gptMessage);
      //     });
      // }

      if (roomId === '0gemini') {
        this.handleGeminiMessage(roomId, content, file);
      }
    }
  };

  public updateReactionToMessage = async (
    roomId: string,
    messageId: string,
    emoji: string,
    isExist: boolean,
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
                    loggedUser.uid,
                  )
                : firebase.default.firestore.FieldValue.arrayUnion(
                    loggedUser.uid,
                  ),
            },
          },
          { merge: true },
        );
      }
    }
  };

  private handleGeminiMessage = (
    roomId: string,
    content: string,
    file?: File | null,
  ) => {
    let imageStream$: Observable<string | undefined>;

    if (file && file.type.startsWith('image/')) {
      imageStream$ = from(convertFileToBase64(file));
    } else {
      imageStream$ = of(undefined);
    }

    imageStream$
      .pipe(
        switchMap((img: string | undefined) =>
          this.geminiService.askGemini(content, img),
        ),
      )
      .subscribe({
        next: (response) => {
          const geminiMsg = {
            body: response,
            sender: GEMINI_USER,
            timestamp: new Date().getTime(),
          } as Message;

          this.saveMessage(roomId, geminiMsg);
        },
        error: (err: Error) => {
          const errorMessage =
            err?.message || (typeof err === 'string' ? err : '');
          console.error('התרחשה שגיאה בתהליך:', err, errorMessage);

          if (err.message.includes('MISSING_API_KEY')) {
            this.openApiKeyDialog(roomId, content, file);
          } else {
            console.error('שגיאה:', err.message);
          }
        },
      });
  };

  private openApiKeyDialog = (
    roomId: string,
    content: string,
    file?: File | null,
  ) => {
    const dialogRef = this.dialog.open(ApiKeyDialogComponent, {
      width: '400px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((apiKey: string | undefined) => {
      if (apiKey) {
        this.geminiService.saveApiKey(apiKey);

        this.handleGeminiMessage(roomId, content, file);
      }
    });
  };
}
