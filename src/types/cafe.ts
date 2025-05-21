
// Employee types
export interface Employee {
  id: number;
  name: string;
  phone_no: string;
  address: string;
  salary: number;
}

// Customer types
export interface Customer {
  id: number;
  name: string;
  phone_no: string;
  address: string;
  membership_status: string;
}

// Menu item types
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  employee_id: number;
}

// Order types
export interface Order {
  id: number;
  customer_id: number;
  employee_id: number;
  order_date: string;
  customerName?: string;
  employeeName?: string;
  total?: number;
}

// Order item types
export interface OrderItem {
  id: number;
  order_id: number;
  quantity: number;
  item_id: number;
  itemName?: string;
  price?: number;
}

// Dashboard statistics
export interface DashboardStats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  popularItems: {
    name: string;
    count: number;
  }[];
}
