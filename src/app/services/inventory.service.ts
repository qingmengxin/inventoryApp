import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryItem, mapToDatabaseItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // 获取所有库存项（字段映射）
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      map(data =>
        data.map(item => ({
          id: item.id,
          name: item.item_name,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          supplier: item.supplier_name,
          stockStatus: item.stock_status,
          featured: !!item.featured_item,
          specialNotes: item.special_notes || ''
        }))
      )
    );
  }

  // 根据名称获取单个库存项
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<any>(`${this.apiUrl}/${name}`).pipe(
      map(item => ({
        id: item.id,
        name: item.item_name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        supplier: item.supplier_name,
        stockStatus: item.stock_status,
        featured: !!item.featured_item,
        specialNotes: item.special_notes || ''
      }))
    );
  }

  // 添加新库存项（发送格式化数据）
  addItem(item: InventoryItem): Observable<any> {
    const mapped = mapToDatabaseItem(item);
    return this.http.post(`${this.apiUrl}/`, mapped, this.httpOptions);
  }

  // 更新已有库存项（发送格式化数据）
  updateItem(name: string, item: InventoryItem): Observable<any> {
    const mapped = mapToDatabaseItem(item);
    return this.http.put(`${this.apiUrl}/${name}`, mapped, this.httpOptions);
  }

  // 删除库存项（名称为“Laptop”的不能删除）
  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`, this.httpOptions);
  }
}
