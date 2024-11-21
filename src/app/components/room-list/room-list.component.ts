import { Component, Input, OnInit } from '@angular/core';
import { ChatRoom } from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  
  @Input() rooms:ChatRoom[] = []

  public currentRoomId=''

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentRoomId = params.get('roomId') || ''
    });
  }


}
