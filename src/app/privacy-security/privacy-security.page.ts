import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.page.html',
  styleUrls: ['./privacy-security.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule  
  ]
})
export class PrivacySecurityPage {}
