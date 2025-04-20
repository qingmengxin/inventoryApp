import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http'; // 替换 HttpClientModule
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router'; // 导入路由策略接口

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(), // Ionic 基础配置
    provideRouter(routes), // 路由配置
    provideHttpClient(), // 正确提供 HttpClient
    provideAnimations(),
    { 
      provide: RouteReuseStrategy, // 注入 Ionic 路由策略
      useClass: IonicRouteStrategy 
    }
  ]
});