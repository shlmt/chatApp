import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRoomDialogComponent } from '../add-room-dialog/add-room-dialog.component';

@Component({
  selector: 'app-add-room-btn',
  templateUrl: './add-room-btn.component.html',
  styleUrls: ['./add-room-btn.component.scss']
})
export class AddRoomBtnComponent {

  @Input() onAddRoom!: (roomName: string) => void;

  constructor(public dialog:MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoomDialogComponent, {
      width: '250px',
    })

    dialogRef.afterClosed().subscribe(result => {
      this.onAddRoom(result)
    })
  }

}
