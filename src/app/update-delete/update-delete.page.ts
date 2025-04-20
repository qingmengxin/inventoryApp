import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.page.html',
  styleUrls: ['./update-delete.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,  
    HttpClientModule
  ]
})
export class UpdateDeletePage {}
