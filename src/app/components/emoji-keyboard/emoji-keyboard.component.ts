import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-keyboard',
  templateUrl: './emoji-keyboard.component.html',
  styleUrls: ['./emoji-keyboard.component.scss']
})
export class EmojiKeyboardComponent {
  emojis: string[] = ['😊', '😂', '😍', '🙃', '🥳', '🤔', '😢', '❤️', '👍', '🎉']
  isOpen: boolean = false

  @Output() emojiSelected = new EventEmitter<string>()

  @HostListener('document:click', ['$event']) onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.emoji-keyboard')) {
      this.isOpen = false;
    }
  }

  toggleKeyboard(): void {
    this.isOpen = !this.isOpen
  }

  selectEmoji(emoji: string): void {
    this.emojiSelected.emit(emoji)
    this.isOpen = false
  }
}
