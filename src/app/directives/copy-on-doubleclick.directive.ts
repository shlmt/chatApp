import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; //!!?

@Directive({
  selector: '[appCopyOnDoubleclick]'
})
export class CopyOnDoubleclickDirective {

  constructor(private el:ElementRef, private snackBar:MatSnackBar) { }

  @HostListener('dblclick') onDoubleClick() {
    const username = this.el.nativeElement.querySelector('.sender')?.innerText;
    const messageText = this.el.nativeElement.querySelector('.content')?.innerText;
    const timestamp = this.el.nativeElement.querySelector('.hour')?.innerText;
    const emojiKeys = Array.from(this.el.nativeElement.querySelectorAll('.key'))
      .map(element => (element as HTMLElement).textContent?.trim() || '').join('')
    navigator.clipboard.writeText(messageText ? `${username}: "${messageText}"${emojiKeys==''?'':' '+emojiKeys}, ${timestamp}` : this.el.nativeElement.innerText ?? "")    
    this.snackBar.open('copied!', 'ok', { duration:2000 })
  }

}
