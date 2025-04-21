import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem, Category, StockStatus, mapToDatabaseItem } from 'src/app/models/inventory-item.model';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule],
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage {
  newItem: Omit<InventoryItem, 'id'> = {
    name: '',
    category: Category.Electronics,
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: StockStatus.InStock,
    featured: false,
    specialNotes: ''
  };

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  // 确保 onSubmit 方法存在且拼写正确
  onSubmit(): void { 
    if (!this.newItem.name || this.newItem.name.trim() === '') {
      alert('商品名称不能为空');
      return;
    }

    if (!this.newItem.supplier || this.newItem.supplier.trim() === '') {
      alert('供应商名称不能为空');
      return;
    }

    // 使用 mapToDatabaseItem 映射前端数据
    const itemToSubmit = mapToDatabaseItem({
      ...this.newItem,
      id: Date.now(), // 临时 ID
    });

    this.inventoryService.addItem(itemToSubmit).subscribe({
      next: () => {
        alert('商品添加成功！');
        this.router.navigate(['/home']);
      },
      error: (err: any) => { // 可以更精确地指定错误类型
        console.error('添加失败:', err);
        alert(`添加失败: ${err.statusText || '未知错误'}`);
      }
    });
  }

  // 确保 cancel 方法存在且拼写正确
  cancel(): void {
    this.router.navigate(['/home']);
  }
}
