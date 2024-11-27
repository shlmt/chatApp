import { Component, Input } from '@angular/core';
import { Message } from '../../models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message!:Message
  @Input() loggedUserId!: string

  constructor() { }

}
