import { Component } from '@angular/core'
import { jackInTheBoxAnimation, shakeAnimation } from 'angular-animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    jackInTheBoxAnimation(),
    shakeAnimation()
  ]
})
export class HomeComponent {
  h1State = false
  pState = false

  constructor() { 
      this.animate()
  }

  animate() {
    this.h1State = false
    setTimeout(() => {
      this.h1State = true
      this.pState = false
      setTimeout(()=>{
        this.pState = true
      },1000)
    }, 1)
  }

}
