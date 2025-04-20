import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem, Category, StockStatus } from 'src/app/models/inventory-item.model';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.page.html',
  styleUrls: ['./update-delete.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule
  ]
})
export class UpdateDeletePage implements OnInit {
  itemForm: FormGroup;
  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);
  currentItem: InventoryItem | null = null;
  isSearching = false;
  searchTerm = '';

  constructor(
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      supplier: ['', Validators.required],
      stockStatus: ['', Validators.required],
      featured: [0, Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
  }

  // 搜索商品
  searchItem() {
    if (!this.searchTerm.trim()) {
      this.showAlert('错误', '请输入商品名称');
      return;
    }

    this.isSearching = true;
    this.inventoryService.getItemByName(this.searchTerm).subscribe({
      next: (item) => {
        this.currentItem = item;
        this.itemForm.patchValue(item);
        this.isSearching = false;
      },
      error: (err) => {
        this.showAlert('错误', '未找到该商品');
        this.isSearching = false;
        this.currentItem = null;
        this.itemForm.reset();
      }
    });
  }

  // 更新商品
  updateItem() {
    if (!this.itemForm.valid || !this.currentItem) {
      this.showAlert('错误', '请填写所有必填字段');
      return;
    }

    const updatedItem: InventoryItem = {
      ...this.currentItem,
      ...this.itemForm.value
    };

    this.inventoryService.updateItem(this.currentItem.name, updatedItem).subscribe({
      next: () => {
        this.showAlert('成功', '商品已更新');
        this.currentItem = updatedItem;
      },
      error: (err) => {
        this.showAlert('错误', '更新商品时出错');
      }
    });
  }

  // 删除商品
  async deleteItem() {
    if (!this.currentItem) {
      this.showAlert('错误', '没有可删除的商品');
      return;
    }

    if (this.currentItem.name === '笔记本电脑') {
      this.showAlert('错误', '无法删除"笔记本电脑"商品');
      return;
    }

    const alert = await this.alertController.create({
      header: '确认删除',
      message: `确定要删除 "${this.currentItem.name}" 吗？`,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '删除',
          handler: () => {
            this.inventoryService.deleteItem(this.currentItem!.name).subscribe({
              next: () => {
                this.showAlert('成功', '商品已删除');
                this.currentItem = null;
                this.itemForm.reset();
                this.searchTerm = '';
              },
              error: (err) => {
                this.showAlert('错误', '删除商品时出错');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // 显示帮助信息
  showHelp() {
    this.showAlert('帮助', '在此页面，您可以搜索商品，然后更新或删除它。\n\n1. 输入商品名称并点击搜索\n2. 修改需要更新的字段\n3. 点击"更新商品"保存更改\n4. 或点击"删除商品"删除该记录\n\n注意：不能删除"笔记本电脑"商品');
  }

  // 显示警告框
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['确定']
    });
    await alert.present();
  }
}