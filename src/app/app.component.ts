// app.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonApp,
    IonRouterOutlet
  ]
  // 删除 providers 数组
})
export class AppComponent {
  constructor(private router: Router) {}
}