// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast'; 
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, ToastModule, RatingModule],
  template: `
  <div class="app-container">
    <p-menubar [model]="menuItems">
      <ng-template pTemplate="start">
        <h2 class="app-title">Feedback App</h2>
      </ng-template>
    </p-menubar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <p-toast></p-toast>
  </div>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems = [
    { label: 'Form', routerLink: '/form' },
    { label: 'Dashboard', routerLink: '/dashboard' }
  ];
}
