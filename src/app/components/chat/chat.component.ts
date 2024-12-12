import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Message } from '../../models';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent{

  @ViewChild('virtualScroll') virtualScroll?:CdkVirtualScrollViewport

  @Output() onSendMsgOccurs:EventEmitter<{message:string, file:File|null|undefined}> = new EventEmitter()

  @Input() set messages(messages:Message[]) {
    this._messages = messages.sort((a,b) => a.timestamp - b.timestamp) 
    setTimeout(() => {
      if (this.virtualScroll) {
        this.virtualScroll.scrollToIndex(this._messages.length, 'smooth')
      }
    })
  }

  private _messages:Message[] = []

  get messages(){
    return this._messages
  }

  public loggedUserId:string = ''

  constructor(private authService:AuthService) { 
    this.authService.subUserData().subscribe(user => {
      this.loggedUserId = user?.uid ?? ''
    })
  }

  onSendMsg = (event:{message:string, file:File|null|undefined}) => {
    this.onSendMsgOccurs.emit(event)
  }

}
