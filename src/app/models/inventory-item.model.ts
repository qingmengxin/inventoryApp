// inventory-item.model.ts

export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

export interface InventoryItem {
  id: number; // Ensure this is 'number' and not 'number | undefined'
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;  // Frontend uses 'supplier'
  stockStatus: string;
  featured: boolean;
  specialNotes?: string;
}

// inventory-item.model.ts

export function mapToDatabaseItem(item: Omit<InventoryItem, 'id'> & { id: number }): any {
  // 检查必填字段，避免提交空值
  if (!item.name || item.name.trim() === '') {
    throw new Error('商品名称不能为空');
  }

  if (!item.supplier || item.supplier.trim() === '') {
    throw new Error('供应商名称不能为空');
  }

  return {
    item_name: item.name,  // 映射前端的 name 到后端的 item_name
    category: item.category,
    quantity: item.quantity,
    price: item.price,
    supplier_name: item.supplier, // 映射 supplier 到 supplier_name
    stock_status: item.stockStatus, // 映射库存状态
    featured_item: item.featured !== undefined ? item.featured : false, // 确保 featured_item 不为 null
    special_notes: item.specialNotes || '', // 处理可选字段
    id: item.id,  // 提供一个 ID
  };
}


