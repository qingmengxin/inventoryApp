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
          console.error('商品加载失败:', err);
          alert('未找到匹配的商品');
        }
      });
    } else {
      this.updatedItem = undefined; // 如果没有搜索条件，清除商品信息
    }
  }

  // 更新商品
  onUpdate(): void {
    if (!this.updatedItem?.name || this.updatedItem?.name.trim() === '') {
      alert('商品名称不能为空');
      return;
    }

    if (!this.updatedItem?.supplier || this.updatedItem?.supplier.trim() === '') {
      alert('供应商名称不能为空');
      return;
    }

    // 使用 mapToDatabaseItem 映射前端数据
    const itemToUpdate = mapToDatabaseItem(this.updatedItem);

    // 调用服务更新商品
    this.inventoryService.updateItem(this.updatedItem?.name, itemToUpdate).subscribe({
      next: () => {
        alert('商品更新成功！');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('更新失败:', err);
        alert(`更新失败: ${err.statusText || '未知错误'}`);
      }
    });
  }

  // 删除商品
  onDelete(): void {
    if (!this.itemNameToDelete || this.itemNameToDelete.trim() === '') {
      alert('商品名称不能为空');
      return;
    }

    // 在删除前做确认
    if (this.itemNameToDelete.toLowerCase() === 'laptop') {
      alert('“Laptop”商品无法删除');
      return;
    }

    // 调用删除接口
    this.inventoryService.deleteItem(this.itemNameToDelete).subscribe({
      next: () => {
        alert('商品删除成功！');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('删除失败:', err);
        alert(`删除失败: ${err.statusText || '未知错误'}`);
      }
    });
  }

  // 取消操作
  cancel(): void {
    this.router.navigate(['/home']);
  }
}
