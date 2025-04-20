import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory-item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule],
})
export class HomePage implements OnInit {

  searchQuery: string = '';
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  isLoading: boolean = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.isLoading = false;
      }
    });
  }

  filterItems() {
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(query)
    );
  }

  showHelp() {
    alert('Use the search bar to find items by name. Use the buttons below to navigate to other features.');
  }
}
