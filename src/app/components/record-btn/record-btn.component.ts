import { Component, EventEmitter, Output } from '@angular/core'
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service'

@Component({
  selector: 'app-record-btn',
  templateUrl: './record-btn.component.html',
  styleUrls: ['./record-btn.component.scss']
})
export class RecordBtnComponent {
  isRecording = false

  @Output() onRecognize:EventEmitter<string> = new EventEmitter()

  constructor(private speechService: SpeechRecognitionService) {}

    toggleRecording = (): void => {
    if (!this.isRecording) {
      this.isRecording = true
      this.startRecording()    
    }
    else {
      this.isRecording = false
      this.stopRecording()
    }
  }

  private startRecording = () => {
    this.speechService.startRecognition((text: string) => {
      if(text) this.onRecognize.emit(text)
    })
  }

  private stopRecording = () => {
    this.speechService.stopRecognition()
  }
}
