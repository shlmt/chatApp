import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Message } from '../../models';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @ViewChild('virtualScroll') virtualScroll?:CdkVirtualScrollViewport

  @Output() onSendMsg:EventEmitter<string> = new EventEmitter()

  @Input() set messages(messages:Message[]) {
    this._messages = messages.sort((a,b) => a.timestamp - b.timestamp) 
    this.virtualScroll?.scrollToIndex(messages.length,'smooth')   
  }

  private _messages:Message[] = []

  get messages(){
    return this._messages
  }

  public loggedUserId:string = ''

  constructor(private authService:AuthService) { 
    this.loggedUserId = authService.getUserId() || ''
  }

  public sendMsg = (input:HTMLInputElement) =>{
    this.onSendMsg.emit(input.value)
    input.value=''
  }

}
