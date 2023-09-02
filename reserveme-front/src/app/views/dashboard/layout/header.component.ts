import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  template: `
    <p-header>
      <div class="app-header">
          <button pButton icon="pi pi-bars" (click)="onToggleSidebar()" class="p-button-rounded p-button-text"></button>
          <h1 class="dataview-title">{{this.title}}</h1>
      </div>
  </p-header>
  `
})
export class HeaderComponent {

  @Input() title: string = '';

  constructor(
    private dataService: DataService,
  ) {

  }

  onToggleSidebar(): void {
    this.dataService.toggleSidebar(true);
  }

}
