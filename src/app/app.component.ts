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
    this.mode = JSON.parse(localStorage.getItem('darkmode') ?? 'false') ? 'dark' :'light' 
  }

  public onThemeChange=(isDarkMode:boolean)=>{
    this.mode = isDarkMode ? 'dark' :'light'
    localStorage.setItem('darkmode',JSON.stringify(isDarkMode))
    const theme = this.mode=='dark' ? 'pink-bluegrey' : 'indigo-pink'
    this.switchTheme(`assets/${theme}.css`);
    this.applyTheme(this.mode)
  }

  private switchTheme = (themePath: string) => {
    const existingLinkElement = document.head.querySelector('link[rel="stylesheet"][id="theme-link"]');
    if (existingLinkElement) {
      existingLinkElement.setAttribute('href', themePath);
    } else {
      const newLinkElement = document.createElement('link');
      newLinkElement.setAttribute('rel', 'stylesheet');
      newLinkElement.setAttribute('id', 'theme-link');
      newLinkElement.setAttribute('href', themePath);
      document.head.appendChild(newLinkElement);
    }
  }
  
  private applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (theme == 'dark') {
      root.style.setProperty('--background-color', '#424242');
      root.style.setProperty('--second-background-color', '#b6b5b5');
      root.style.setProperty('--primary-color', '#c2185b');
      root.style.setProperty('--primary-color-hover', '#941447');
      root.style.setProperty('--second-color', '#dbb8c4e3');
    }
    else {
      root.style.setProperty('--background-color', 'white');
      root.style.setProperty('--second-background-color', '#f5f5f5');
      root.style.setProperty('--primary-color', '#3f51b5');
      root.style.setProperty('--primary-color-hover', '#1f2d7a');
      root.style.setProperty('--second-color', '#e9edfa');
    }
  }

}
