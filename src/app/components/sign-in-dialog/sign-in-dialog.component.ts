import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss']
})
export class SignInDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
      private dialogRef: MatDialogRef<SignInDialogComponent>
  ) { }

  signInWithGoogle = () => {
    this.input.loginWithGoogle()
    this.dialogRef.close()
  }
  
  signInWithGithub = () => {
    this.input.loginWithGithub()
    this.dialogRef.close()
  }
}
