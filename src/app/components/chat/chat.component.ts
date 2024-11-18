import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() messages:Message[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
