import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatRoom, Message } from '../../models';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnDestroy {

  private roomId?:string
  private subscription = new Subscription()

  public rooms$:Observable<ChatRoom[]>
  public messages$?:Observable<Message[]>

  constructor(private chatService:ChatService,
    private router:Router
  ) {
    this.rooms$ = chatService.getRooms()

    this.subscription.add(
        router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(data =>{
          const urlArr = (data as RouterEvent).url.split('/')
          if(urlArr.length>2) {
            this.roomId = urlArr[2]
            this.messages$ = chatService.getRoomMessages(urlArr[2])
          }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public addRoom = (roomName:string) => {
    this.chatService.addRoom(roomName)
  }

  public onSendMsg = (payload:{message:string, file:File|null|undefined}) => {
    if(this.roomId && ((payload.message && payload.message!='') || payload.file))
      this.chatService.addMeasseageToRoom(this.roomId,payload.message,payload.file)
  }
}
