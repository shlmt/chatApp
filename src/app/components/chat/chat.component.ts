import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() messages:Message[] = []
  @Output() onSendMsg:EventEmitter<string> = new EventEmitter()

  constructor() { }

  public sendMsg = (input:HTMLInputElement) =>{
    this.onSendMsg.emit(input.value)
    input.value=''
  }

}
