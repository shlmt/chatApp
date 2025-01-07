import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models';
import detectTextDirection from 'src/app/utils';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  detectTextDirection = detectTextDirection

  @Input() message!:Message
  @Input() loggedUserId!: string

  @Output() onAddReaction:EventEmitter<{messageId:string, emoji:string, isExist:boolean}> = new EventEmitter()

  constructor() { }

  addReaction = (emoji:string) =>{
    this.onAddReaction.emit({messageId: this.message.id, emoji, isExist:this.message.reactions?.[emoji]?.includes(this.loggedUserId) ?? false})
  }
  
}
