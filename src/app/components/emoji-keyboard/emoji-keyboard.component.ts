import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-keyboard',
  templateUrl: './emoji-keyboard.component.html',
  styleUrls: ['./emoji-keyboard.component.scss']
})
export class EmojiKeyboardComponent {
  keyboardId = `keyboard-${Math.random().toString(36).substr(2, 9)}`
  emojis: string[] = ['😊', '😂', '😍', '🙃', '🥳', '🤔', '😢', '❤️', '👍', '🎉']
  isOpen: boolean = false

  @Output() emojiSelected = new EventEmitter<string>()

  @HostListener('document:click', ['$event']) onClickOutside(event: Event): void {
    const target = event.target as HTMLElement
    const clickedKeyboardId = target.closest('.emoji-keyboard')?.getAttribute('data-id')
    if (clickedKeyboardId !== this.keyboardId) 
      this.isOpen = false
  }

  toggleKeyboard(): void {
    this.isOpen = !this.isOpen
  }

  selectEmoji(emoji: string): void {
    this.emojiSelected.emit(emoji)
    this.isOpen = false
  }
}
