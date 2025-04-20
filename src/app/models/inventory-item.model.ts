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
    supplier: string;
    stockStatus: string;
    featured: boolean;
    specialNotes?: string;
  }