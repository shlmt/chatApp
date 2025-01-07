import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import detectTextDirection from 'src/app/utils'

@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss']
})
export class InputChatComponent {
  detectTextDirection = detectTextDirection
  isFileSelected: boolean|null = false
  fileUploadName:string = ''

  inputValue = ''

  @Output() onSendMsg:EventEmitter<{message:string, file:File|null|undefined}> = new EventEmitter()
  @ViewChild('newMessage') newMessage?:HTMLInputElement

  constructor() { }

  onUpload = (event:any) => {
    const file = event.target.files[0]
    const maxSize = 2 * 1024 * 1024
    if (file && file.size > maxSize) {
      alert('Error: File too large. Upload file up to 2MB')
      this.isFileSelected=false
      event.target.value=''
    }
    else if(file){
      this.isFileSelected=true
      this.fileUploadName=file.name
    }
    else{
      this.isFileSelected=false
      this.fileUploadName='' 
    } 
  }

  sendMsg = (files:HTMLInputElement) =>{
    const file = files.files?.item(0)
    this.onSendMsg.emit({message:this.inputValue ?? '', file:file})
    this.isFileSelected=false
    this.fileUploadName=''
    this.inputValue = ''
    files.value = ''
  }

  onRecognize = (text:string) => {
      this.inputValue = text
  }

}
