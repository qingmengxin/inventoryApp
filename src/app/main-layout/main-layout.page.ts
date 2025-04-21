import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule] // 引入 Ionic 和路由模块供 HTML 模板使用
})
export class MainLayoutPage {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
