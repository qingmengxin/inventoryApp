import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
<<<<<<< Updated upstream
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';
=======
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem, Category, StockStatus } from 'src/app/models/inventory-item.model';
>>>>>>> Stashed changes

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, IonicModule],
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
<<<<<<< Updated upstream
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule  
  ]
=======
>>>>>>> Stashed changes
})
export class AddItemPage {
  // 使用正确的类型初始化
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

  // 枚举值用于模板
  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  onSubmit() {
    // 在实际应用中，ID应该由后端生成
    // 这里使用临时ID，实际提交时应该去掉或由后端分配
    const itemToSubmit: InventoryItem = {
      ...this.newItem,
      id: Date.now() // 临时ID，仅用于演示
    };

    this.inventoryService.addItem(itemToSubmit).subscribe({
      next: () => {
        alert('商品添加成功！');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('添加失败:', err);
        alert(`添加失败: ${err.statusText || '未知错误'}`);
      }
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}