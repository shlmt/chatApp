import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() onChangeMode:EventEmitter<boolean> = new EventEmitter()

  public isLoggedIn$:Observable<boolean>
  public userDetails$:Observable<User|undefined>

  public isDarkMode = false

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
  }

}
