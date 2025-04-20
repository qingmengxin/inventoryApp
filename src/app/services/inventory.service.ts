import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  // 获取所有库存项
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/`);
  }

  // 根据名称获取单个库存项
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${name}`);
  }

  // 添加新库存项
  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, item, this.httpOptions);
  }

  // 更新已有库存项
  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${name}`, item, this.httpOptions);
  }

  // 删除库存项（名称为“Laptop”的不能删除）
  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`, this.httpOptions);
  }
}
