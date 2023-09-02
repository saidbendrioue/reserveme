import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p-toast [breakpoints]="{'920px': {width: '100%', right: '0', left: '0'}}"></p-toast>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'reserveme-front';
}
