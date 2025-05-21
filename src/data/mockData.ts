
import { Employee, Customer, MenuItem, Order, OrderItem, DashboardStats } from "../types/cafe";

export const mockEmployees: Employee[] = [
  { id: 1, name: "John Doe", phone_no: "123-456-7890", address: "123 Main St", salary: 2500 },
  { id: 2, name: "Jane Smith", phone_no: "098-765-4321", address: "456 Oak Ave", salary: 2300 },
  { id: 3, name: "Bob Johnson", phone_no: "555-123-4567", address: "789 Pine Rd", salary: 2200 },
  { id: 4, name: "Alice Williams", phone_no: "555-987-6543", address: "321 Cedar Ln", salary: 2400 },
  { id: 5, name: "Charlie Brown", phone_no: "555-567-8901", address: "654 Maple Dr", salary: 2100 },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: "Michael Scott", phone_no: "333-444-5555", address: "123 Office St", membership_status: "Gold" },
  { id: 2, name: "Pam Beesly", phone_no: "444-555-6666", address: "456 Dunder Mifflin", membership_status: "Silver" },
  { id: 3, name: "Jim Halpert", phone_no: "555-666-7777", address: "789 Scranton Rd", membership_status: "Gold" },
  { id: 4, name: "Dwight Schrute", phone_no: "666-777-8888", address: "123 Beet Farm", membership_status: "Platinum" },
  { id: 5, name: "Angela Martin", phone_no: "777-888-9999", address: "456 Cat Lover Lane", membership_status: "Silver" },
];

export const mockMenuItems: MenuItem[] = [
  { id: 1, name: "Espresso", price: 3.99, category: "Coffee", employee_id: 1 },
  { id: 2, name: "Cappuccino", price: 4.99, category: "Coffee", employee_id: 1 },
  { id: 3, name: "Latte", price: 4.50, category: "Coffee", employee_id: 2 },
  { id: 4, name: "Mocha", price: 5.50, category: "Coffee", employee_id: 2 },
  { id: 5, name: "Americano", price: 3.50, category: "Coffee", employee_id: 3 },
  { id: 6, name: "Croissant", price: 3.99, category: "Pastry", employee_id: 4 },
  { id: 7, name: "Blueberry Muffin", price: 3.50, category: "Pastry", employee_id: 4 },
  { id: 8, name: "Chocolate Cake", price: 5.99, category: "Dessert", employee_id: 5 },
  { id: 9, name: "Cheesecake", price: 6.99, category: "Dessert", employee_id: 5 },
  { id: 10, name: "Ham & Cheese Sandwich", price: 7.99, category: "Sandwich", employee_id: 3 },
];

export const mockOrders: Order[] = [
  { id: 1, customer_id: 1, employee_id: 1, order_date: "2023-05-01T10:30:00", customerName: "Michael Scott", employeeName: "John Doe", total: 13.97 },
  { id: 2, customer_id: 2, employee_id: 2, order_date: "2023-05-01T11:45:00", customerName: "Pam Beesly", employeeName: "Jane Smith", total: 8.49 },
  { id: 3, customer_id: 3, employee_id: 1, order_date: "2023-05-02T09:15:00", customerName: "Jim Halpert", employeeName: "John Doe", total: 12.48 },
  { id: 4, customer_id: 4, employee_id: 3, order_date: "2023-05-02T14:30:00", customerName: "Dwight Schrute", employeeName: "Bob Johnson", total: 17.98 },
  { id: 5, customer_id: 5, employee_id: 2, order_date: "2023-05-03T16:00:00", customerName: "Angela Martin", employeeName: "Jane Smith", total: 10.49 },
  { id: 6, customer_id: 1, employee_id: 4, order_date: "2023-05-04T10:00:00", customerName: "Michael Scott", employeeName: "Alice Williams", total: 15.97 },
  { id: 7, customer_id: 3, employee_id: 5, order_date: "2023-05-04T13:15:00", customerName: "Jim Halpert", employeeName: "Charlie Brown", total: 9.49 },
];

export const mockOrderItems: OrderItem[] = [
  { id: 1, order_id: 1, item_id: 1, quantity: 1, itemName: "Espresso", price: 3.99 },
  { id: 2, order_id: 1, item_id: 6, quantity: 1, itemName: "Croissant", price: 3.99 },
  { id: 3, order_id: 1, item_id: 7, quantity: 1, itemName: "Blueberry Muffin", price: 3.50 },
  { id: 4, order_id: 2, item_id: 3, quantity: 1, itemName: "Latte", price: 4.50 },
  { id: 5, order_id: 2, item_id: 7, quantity: 1, itemName: "Blueberry Muffin", price: 3.50 },
  { id: 6, order_id: 3, item_id: 2, quantity: 1, itemName: "Cappuccino", price: 4.99 },
  { id: 7, order_id: 3, item_id: 6, quantity: 1, itemName: "Croissant", price: 3.99 },
  { id: 8, order_id: 3, item_id: 7, quantity: 1, itemName: "Blueberry Muffin", price: 3.50 },
  { id: 9, order_id: 4, item_id: 10, quantity: 1, itemName: "Ham & Cheese Sandwich", price: 7.99 },
  { id: 10, order_id: 4, item_id: 4, quantity: 1, itemName: "Mocha", price: 5.50 },
  { id: 11, order_id: 4, item_id: 8, quantity: 1, itemName: "Chocolate Cake", price: 5.99 },
  { id: 12, order_id: 5, item_id: 3, quantity: 1, itemName: "Latte", price: 4.50 },
  { id: 13, order_id: 5, item_id: 9, quantity: 1, itemName: "Cheesecake", price: 6.99 },
  { id: 14, order_id: 6, item_id: 2, quantity: 1, itemName: "Cappuccino", price: 4.99 },
  { id: 15, order_id: 6, item_id: 8, quantity: 1, itemName: "Chocolate Cake", price: 5.99 },
  { id: 16, order_id: 6, item_id: 6, quantity: 1, itemName: "Croissant", price: 3.99 },
  { id: 17, order_id: 7, item_id: 5, quantity: 1, itemName: "Americano", price: 3.50 },
  { id: 18, order_id: 7, item_id: 7, quantity: 1, itemName: "Blueberry Muffin", price: 3.50 },
];

export const mockDashboardStats: DashboardStats = {
  totalOrders: 7,
  totalCustomers: 5,
  totalRevenue: 88.87,
  popularItems: [
    { name: "Blueberry Muffin", count: 4 },
    { name: "Croissant", count: 3 },
    { name: "Latte", count: 2 },
    { name: "Cappuccino", count: 2 },
    { name: "Chocolate Cake", count: 2 },
  ],
};
