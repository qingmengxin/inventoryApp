import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

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

  // 获取所有库存项，添加字段映射
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      map(data =>
        data.map(item => ({
          id: item.id,
          name: item.item_name || '',  // 映射字段，避免 undefined
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          supplier: item.supplier_name,
          stockStatus: item.stock_status,
          featured: item.featured_item,
          specialNotes: item.special_notes
        }))
      )
    );
  }

  // 获取单个库存项
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${name}`);
  }

  // 添加库存项
  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, item, this.httpOptions);
  }

  // 更新库存项
  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${name}`, item, this.httpOptions);
  }

  // 删除库存项
  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`, this.httpOptions);
  }
}
