import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IonIcon
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
    IonIcon
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
    console.log('刷新中...');
    await this.loadItems();
    (event.target as HTMLIonRefresherElement)?.complete();
  }

  private async loadItems(): Promise<void> {
    this.isLoading = true;
    console.log('加载商品...');
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        console.log('商品数据:', data);
        this.items = data;
        this.filteredItems = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('加载商品失败');
        this.isLoading = false;
        alert('数据加载失败，请稍后重试');
      }
    });
  }

  onSearchQueryChange() {
    console.log('搜索查询:', this.searchQuery);
    this.searchSubject.next(this.searchQuery.trim().toLowerCase());
  }

  private filterItems(query: string) {
    this.filteredItems = this.items.filter(item =>
      [item.name, item.category, item.supplier, item.stockStatus]
        .some(field => field?.toLowerCase().includes(query))
    );
  }

  showHelp() {
    console.log('显示帮助');
    alert('操作指南：\n\n- 下拉可刷新商品列表\n- 可通过名称/分类/供应商进行搜索\n- 点击右下角按钮显示帮助');
  }
}
