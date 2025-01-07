import { HostListener, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ChatService } from './chat.service'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {

  public roomsIds:string[] = []

  private handleKeySubject = new BehaviorSubject<string>('')
  handleKeySubject$ = this.handleKeySubject.asObservable()

  constructor(private chatService:ChatService, private router:Router) {
    window.addEventListener('keydown', (event) => this.handleKeyDown(event))
    chatService.getRooms().subscribe(data=>this.roomsIds = data.map(room=>room.id))
  }

  private handleKeyDown(event: KeyboardEvent) {
    const keyCombo = `${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`
    const currentUrl = this.router.url

    switch (keyCombo) {
      case 'Shift+C':
        this.router.navigateByUrl('/chat')
        break
      case 'Shift+H':
        this.router.navigateByUrl('/')
        break
      case 'Shift++':
        if (currentUrl.startsWith('/chat')) {
          const currentId = currentUrl.split('/').pop() ?? this.roomsIds[0]
          const currentIndex = this.roomsIds.indexOf(currentId)
          const nextIndex = (currentIndex + 1) % this.roomsIds.length
          const nextId = this.roomsIds[nextIndex]
          if(nextId) this.router.navigate([`/chat/${nextId}`])
        }      
        break
      case 'Shift+-':
        if (currentUrl.startsWith('/chat')) {
          const currentId = currentUrl.split('/').pop() ?? this.roomsIds[0]
          const currentIndex = this.roomsIds.indexOf(currentId)
          const nextIndex = currentIndex==0 ? this.roomsIds.length-1 : (currentIndex - 1) % this.roomsIds.length
          const nextId = this.roomsIds[nextIndex]
          if(nextId) this.router.navigate([`/chat/${nextId}`])
        }      
        break
      case 'Shift+!':
        this.handleKeySubject.next(keyCombo)
        break
      case 'Shift+L':
        this.handleKeySubject.next(keyCombo)
        break
      default:
        break
    }
    }
}
