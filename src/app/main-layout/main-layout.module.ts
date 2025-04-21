import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// No need to declare or export MainLayoutPage since it's a standalone component
import { MainLayoutPage } from './main-layout.page';  // Import the standalone component

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule  // Ensure RouterModule is imported for routing
  ]
})
export class MainLayoutModule {}
