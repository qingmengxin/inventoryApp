import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  home, add, create, lockClosed, 
  helpCircleOutline, createOutline, alertCircleOutline 
} from 'ionicons/icons';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// 注册所有图标
addIcons({ 
  home, add, create, lockClosed,
  'help-circle-outline': helpCircleOutline,
  'create-outline': createOutline,
  'alert-circle-outline': alertCircleOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));