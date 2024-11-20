import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Message } from '../../models';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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

  constructor() { }

  public sendMsg = (input:HTMLInputElement) =>{
    this.onSendMsg.emit(input.value)
    input.value=''
  }

}
