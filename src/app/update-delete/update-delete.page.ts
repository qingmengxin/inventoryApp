import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.page.html',
  styleUrls: ['./update-delete.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateDeletePage implements OnInit {
  itemForm: FormGroup;
  categories = Object.values(Category);
  statuses = Object.values(StockStatus);
  isEditMode = false;
  currentItem: InventoryItem | null = null;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: [Category.Electronics, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      supplier: ['', Validators.required],
      status: [StockStatus.InStock, Validators.required],
      featured: [0],
      notes: ['']
    });
  }

  ngOnInit() {
    const itemName = this.route.snapshot.paramMap.get('name');
    if (itemName) {
      this.loadItem(itemName);
    }
  }

  loadItem(name: string) {
    this.inventoryService.getItemByName(name).subscribe({
      next: (item) => {
        this.currentItem = item;
        this.isEditMode = true;
        this.itemForm.patchValue(item);
      },
      error: (err) => {
        this.showToast(`Error loading item: ${err}`);
        this.router.navigate(['/tabs/list']);
      }
    });
  }

  onSubmit() {
    if (this.itemForm.invalid) {
      this.showToast('Please fill all required fields correctly');
      return;
    }

    const formData = this.itemForm.value;
    if (this.isEditMode && this.currentItem) {
      this.updateItem(this.currentItem.name, formData);
    } else {
      this.addItem(formData);
    }
  }

  updateItem(name: string, item: InventoryItem) {
    this.inventoryService.updateItem(name, item).subscribe({
      next: () => {
        this.showToast('Item updated successfully');
        this.router.navigate(['/tabs/list']);
      },
      error: (err) => {
        this.showToast(`Update failed: ${err}`);
      }
    });
  }

  addItem(item: InventoryItem) {
    this.inventoryService.addItem(item).subscribe({
      next: () => {
        this.showToast('Item added successfully');
        this.router.navigate(['/tabs/list']);
      },
      error: (err) => {
        this.showToast(`Add failed: ${err}`);
      }
    });
  }

  async confirmDelete() {
    if (!this.currentItem) return;

    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete <strong>${this.currentItem.name}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteItem();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteItem() {
    if (!this.currentItem) return;

    this.inventoryService.deleteItem(this.currentItem.name).subscribe({
      next: () => {
        this.showToast('Item deleted successfully');
        this.router.navigate(['/tabs/list']);
      },
      error: (err) => {
        this.showToast(`Delete failed: ${err}`);
      }
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async showHelp() {
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: this.isEditMode 
        ? 'Edit the item details. All fields except notes are required.'
        : 'Add a new inventory item. Fill all required fields.',
      buttons: ['OK']
    });
    await alert.present();
  }
}