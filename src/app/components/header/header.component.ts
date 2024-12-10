import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';
import { rotateAnimation } from 'angular-animations';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';

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

  constructor(private authService:AuthService, private dialog: MatDialog){
    this.isLoggedIn$ = authService.isLoggedIn()
    this.userDetails$ = authService.subUserData()
  }

  openAuthDialog() {
    this.dialog.open(SignInDialogComponent, {
      data: {
        loginWithGoogle: this.loginWithGoogle,
        loginWithGithub: this.loginWithGithub,
      },
    });
  }
  
  public loginWithGoogle=()=>{
    this.authService.signInWithGoogle()
  }

  public loginWithGithub=()=>{
    this.authService.signInWithGithub()
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
