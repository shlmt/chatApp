import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-chat'
  public mode:'light'|'dark' = 'light'

  constructor(){
  }

  public onThemeChange=(isDarkMode:boolean)=>{
    this.mode = isDarkMode ? 'dark' :'light'
  }
}
