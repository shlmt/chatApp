import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-chat'
  public mode:'light'|'dark' = JSON.parse(localStorage.getItem('darkmode') ?? 'true') ? 'light' : 'dark'

  constructor(){
  }

  public onThemeChange=(isDarkMode:boolean)=>{
    this.mode = isDarkMode ? 'dark' :'light'
    localStorage.setItem('mode',JSON.stringify(isDarkMode))
  }
}
