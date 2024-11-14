import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn$:Observable<boolean>

  constructor(private authService:AuthService){
    this.isLoggedIn$ = authService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  
  public loginWithGoogle=()=>{
    this.authService.signInWithGoogle()
  }

  public logout=()=>{
    this.authService.signOut()
  }

}
