import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.scss']
})
export class AddRoomDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddRoomDialogComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }

}
