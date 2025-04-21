import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonFab,
  IonFabButton,
  IonIcon,
  IonNote 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory-item.model';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { helpCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonFab,
    IonFabButton,
    IonIcon,
    IonNote 
  ]
})
export class HomePage implements OnInit, OnDestroy {
  searchQuery = '';
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  isLoading = false;
  helpCircle = helpCircle;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private inventoryService: InventoryService) {
    addIcons({ helpCircle });
  }

  ngOnInit() {
    this.loadItems();
    this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(query => {
      this.filterItems(query);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async doRefresh(event: CustomEvent) {
    console.log('Refreshing in progress...');
    await this.loadItems();
    (event.target as HTMLIonRefresherElement)?.complete();
  }

  private async loadItems(): Promise<void> {
    this.isLoading = true;
    console.log('Load product...');
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        console.log('Product data:', data);
        this.items = data;
        this.filteredItems = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('Loading product failed');
        this.isLoading = false;
        alert('Data loading failed, please try again later');
      }
    });
  }

  onSearchQueryChange() {
    console.log('Search Query:', this.searchQuery);
    this.searchSubject.next(this.searchQuery.trim().toLowerCase());
  }

  private filterItems(query: string) {
    this.filteredItems = this.items.filter(item =>
      [item.name, item.category, item.supplier, item.stockStatus]
        .some(field => field?.toLowerCase().includes(query))
    );
  }

  showHelp() {
    console.log('Display Help');
    alert('operation guide：\n\n- Pull down to refresh the product list\n- Can be searched by name/category/supplier\n- Click the button in the bottom right corner to display help');
  }
}
