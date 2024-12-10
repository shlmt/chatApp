import { Injectable, NgZone } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
  recognition: any

  constructor(private zone: NgZone) {
    const { webkitSpeechRecognition }: any = window as any
    this.recognition = new webkitSpeechRecognition() || new (window as any).SpeechRecognition()
    this.recognition.continuous = true
    this.recognition.interimResults = false
  }

  startRecognition(onResult: (text: string) => void) {
    this.recognition.onresult = (event: any) => {
      this.zone.run(() => {
        const result = event.results[event.resultIndex][0].transcript
        onResult(result)
      })
    }
    this.recognition.start()
  }

  stopRecognition() {
    this.recognition.stop()
  }
}
