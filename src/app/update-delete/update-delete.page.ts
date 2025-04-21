import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem, Category, StockStatus, mapToDatabaseItem } from 'src/app/models/inventory-item.model';

@Component({
  selector: 'app-update-delete-item',
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule],
  templateUrl: './update-delete.page.html',
  styleUrls: ['./update-delete.page.scss'],
})
export class UpdateDeletePage {
  updatedItem: InventoryItem | undefined;
  itemNameToDelete: string = '';
  searchQuery: string = '';  // 用于绑定搜索栏

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 初始加载商品（可选：例如，加载第一个商品或特定商品）
    this.loadItemByName('');
  }

  // 搜索商品
  onSearch(): void {
    this.loadItemByName(this.searchQuery);
  }

  // 根据商品名称加载商品
  loadItemByName(query: string): void {
    if (query.trim()) {
      this.inventoryService.getItemByName(query).subscribe({
        next: (item) => {
          this.updatedItem = item;
        },
        error: (err) => {
          console.error('Product loading failed:', err);
          alert('No matching product found');
        }
      });
    } else {
      this.updatedItem = undefined; // 如果没有搜索条件，清除商品信息
    }
  }

  // 更新商品
  onUpdate(): void {
    if (!this.updatedItem?.name || this.updatedItem?.name.trim() === '') {
      alert('The product name cannot be empty');
      return;
    }

    if (!this.updatedItem?.supplier || this.updatedItem?.supplier.trim() === '') {
      alert('Supplier name cannot be empty');
      return;
    }

    // 使用 mapToDatabaseItem 映射前端数据
    const itemToUpdate = mapToDatabaseItem(this.updatedItem);

    // 调用服务更新商品
    this.inventoryService.updateItem(this.updatedItem?.name, itemToUpdate).subscribe({
      next: () => {
        alert('Product update successful！');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Update failed:', err);
        alert(`Update failed: ${err.statusText || 'unknown error'}`);
      }
    });
  }

  // 删除商品
  onDelete(): void {
    if (!this.itemNameToDelete || this.itemNameToDelete.trim() === '') {
      alert('The product name cannot be empty');
      return;
    }

    // 在删除前做确认
    if (this.itemNameToDelete.toLowerCase() === 'laptop') {
      alert('“Laptop” product cannot be deleted');
      return;
    }

    // 调用删除接口
    this.inventoryService.deleteItem(this.itemNameToDelete).subscribe({
      next: () => {
        alert('Product deleted successfully！');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Delete failed:', err);
        alert(`Delete failed: ${err.statusText || 'unknown error'}`);
      }
    });
  }

  // 取消操作
  cancel(): void {
    this.router.navigate(['/home']);
  }
}
