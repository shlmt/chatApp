import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appThemeSwitcher]'
})
export class DarkModeDirective implements OnChanges {

  @Input('appThemeSwitcher') mode: 'dark'|'light' = 'dark';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] && this.mode) {
      const theme = this.mode=='dark' ? 'pink-bluegrey' : 'indigo-pink'
      this.switchTheme(`assets/${theme}.css`);
      this.applyTheme(this.mode)
    }
  }

  private switchTheme = (themePath: string) => {
    const linkElement = this.el.nativeElement.querySelector('link[rel="stylesheet"][id="theme-link"]');
    if (linkElement) {
      this.renderer.setAttribute(linkElement, 'href', themePath);
    } else {
      const newLinkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(newLinkElement, 'rel', 'stylesheet');
      this.renderer.setAttribute(newLinkElement, 'id', 'theme-link');
      this.renderer.setAttribute(newLinkElement, 'href', themePath);
      this.renderer.appendChild(this.el.nativeElement, newLinkElement);
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