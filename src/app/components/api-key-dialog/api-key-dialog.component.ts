import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-key-dialog',
  templateUrl: './api-key-dialog.component.html',
  styleUrls: ['./api-key-dialog.component.scss']
})
export class ApiKeyDialogComponent {
  form: FormGroup;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<ApiKeyDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      apiKey: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('apiKey')?.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }
}
