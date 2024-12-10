import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';
import { rotateAnimation } from 'angular-animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    rotateAnimation()
  ]
})
export class HeaderComponent {

  animationState = false

  @Output() onChangeMode:EventEmitter<boolean> = new EventEmitter()

  public isLoggedIn$:Observable<boolean>
  public userDetails$:Observable<User|undefined>

  @Input('isDarkMode') isDarkMode:boolean = false

  constructor(private authService:AuthService){
    this.isLoggedIn$ = authService.isLoggedIn()
    this.userDetails$ = authService.subUserData()
  }
  
  public loginWithGoogle=()=>{
    this.authService.signInWithGoogle()
  }

  public logout=()=>{
    this.authService.signOut()
  }

  public changeMode=()=>{
    this.isDarkMode = !this.isDarkMode
    this.onChangeMode.emit(this.isDarkMode)
    this.animationState = !this.animationState
  }

}
