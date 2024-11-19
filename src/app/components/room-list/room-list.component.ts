import { Component, Input, OnInit } from '@angular/core';
import { ChatRoom } from '../../models';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  
  @Input() rooms:ChatRoom[] = []

  constructor() { }

}
