import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Message } from '../../models';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent{

  isFileSelected: boolean|null = false

  @ViewChild('virtualScroll') virtualScroll?:CdkVirtualScrollViewport

  @Output() onSendMsg:EventEmitter<{message:string, file:File|null|undefined}> = new EventEmitter()

  @Input() set messages(messages:Message[]) {
    this._messages = messages.sort((a,b) => a.timestamp - b.timestamp) 
    setTimeout(() => {
      if (this.virtualScroll) {
        this.virtualScroll.scrollToIndex(this._messages.length, 'smooth')
      }
    })
  }

  private _messages:Message[] = []

  get messages(){
    return this._messages
  }

  public loggedUserId:string = ''

  constructor(private authService:AuthService) { 
    this.loggedUserId = authService.getUserId() || ''
  }

  public onUpload = (event:any) => {
    const file = event.target.files[0]
    const maxSize = 2 * 1024 * 1024
    if (file && file.size > maxSize) {
      alert('Error: File too large. Upload file up to 2MB')
      this.isFileSelected=false
      event.target.value=''
    }
    else
      this.isFileSelected=true
  }

  public sendMsg = (input:HTMLInputElement, files:HTMLInputElement) =>{
    const file = files.files?.item(0)
    this.onSendMsg.emit({message:input.value, file:file})
    this.isFileSelected=false
    input.value = ''
    files.value = ''
  }

}
