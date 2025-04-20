import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Import IonicModule for Ionic components
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]  // Import IonicModule and RouterModule
})
export class AppComponent {}
