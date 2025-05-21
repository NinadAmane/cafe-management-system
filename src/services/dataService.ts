
import { 
  mockEmployees, 
  mockCustomers, 
  mockMenuItems, 
  mockOrders, 
  mockOrderItems,
  mockDashboardStats
} from "../data/mockData";
import { 
  Employee, 
  Customer, 
  MenuItem, 
  Order, 
  OrderItem,
  DashboardStats 
} from "../types/cafe";

// Employee services
export const getEmployees = (): Promise<Employee[]> => {
  return Promise.resolve(mockEmployees);
};

export const getEmployeeById = (id: number): Promise<Employee | undefined> => {
  const employee = mockEmployees.find(emp => emp.id === id);
  return Promise.resolve(employee);
};

// Customer services
export const getCustomers = (): Promise<Customer[]> => {
  return Promise.resolve(mockCustomers);
};

export const getCustomerById = (id: number): Promise<Customer | undefined> => {
  const customer = mockCustomers.find(cust => cust.id === id);
  return Promise.resolve(customer);
};

// Menu item services
export const getMenuItems = (): Promise<MenuItem[]> => {
  return Promise.resolve(mockMenuItems);
};

export const getMenuItemById = (id: number): Promise<MenuItem | undefined> => {
  const menuItem = mockMenuItems.find(item => item.id === id);
  return Promise.resolve(menuItem);
};

export const getMenuItemsByCategory = (category: string): Promise<MenuItem[]> => {
  const menuItems = mockMenuItems.filter(item => item.category === category);
  return Promise.resolve(menuItems);
};

// Order services
export const getOrders = (): Promise<Order[]> => {
  return Promise.resolve(mockOrders);
};

export const getOrderById = (id: number): Promise<Order | undefined> => {
  const order = mockOrders.find(ord => ord.id === id);
  return Promise.resolve(order);
};

// Order item services
export const getOrderItems = (): Promise<OrderItem[]> => {
  return Promise.resolve(mockOrderItems);
};

export const getOrderItemsByOrderId = (orderId: number): Promise<OrderItem[]> => {
  const orderItems = mockOrderItems.filter(item => item.order_id === orderId);
  return Promise.resolve(orderItems);
};

// Dashboard services
export const getDashboardStats = (): Promise<DashboardStats> => {
  return Promise.resolve(mockDashboardStats);
};
