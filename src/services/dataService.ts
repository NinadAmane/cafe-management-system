
import { supabase } from "@/integrations/supabase/client";
import { 
  Employee, 
  Customer, 
  MenuItem, 
  Order, 
  OrderItem,
  DashboardStats 
} from "../types/cafe";
import { toast } from "sonner";

// Employee services
export const getEmployees = async (): Promise<Employee[]> => {
  const { data, error } = await supabase
    .from('employees')
    .select('*');
  
  if (error) {
    console.error('Error fetching employees:', error);
    toast.error('Could not fetch employees');
    throw error;
  }
  
  return data || [];
};

export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching employee:', error);
    toast.error('Could not fetch employee details');
    return undefined;
  }
  
  return data;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const { data, error } = await supabase
    .from('employees')
    .insert(employee)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating employee:', error);
    toast.error('Could not create employee');
    throw error;
  }
  
  toast.success('Employee added successfully');
  return data;
};

export const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
  const { data, error } = await supabase
    .from('employees')
    .update(employee)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating employee:', error);
    toast.error('Could not update employee');
    throw error;
  }
  
  toast.success('Employee updated successfully');
  return data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting employee:', error);
    toast.error('Could not delete employee');
    throw error;
  }
  
  toast.success('Employee deleted successfully');
};

// Customer services
export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*');
  
  if (error) {
    console.error('Error fetching customers:', error);
    toast.error('Could not fetch customers');
    throw error;
  }
  
  return data || [];
};

export const getCustomerById = async (id: number): Promise<Customer | undefined> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching customer:', error);
    return undefined;
  }
  
  return data;
};

export const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  const { data, error } = await supabase
    .from('customers')
    .insert(customer)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating customer:', error);
    toast.error('Could not create customer');
    throw error;
  }
  
  toast.success('Customer added successfully');
  return data;
};

export const updateCustomer = async (id: number, customer: Partial<Customer>): Promise<Customer> => {
  const { data, error } = await supabase
    .from('customers')
    .update(customer)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating customer:', error);
    toast.error('Could not update customer');
    throw error;
  }
  
  toast.success('Customer updated successfully');
  return data;
};

export const deleteCustomer = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting customer:', error);
    toast.error('Could not delete customer');
    throw error;
  }
  
  toast.success('Customer deleted successfully');
};

// Menu item services
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*');
  
  if (error) {
    console.error('Error fetching menu items:', error);
    toast.error('Could not fetch menu items');
    throw error;
  }
  
  return data || [];
};

export const getMenuItemById = async (id: number): Promise<MenuItem | undefined> => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching menu item:', error);
    return undefined;
  }
  
  return data;
};

export const getMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error('Error fetching menu items by category:', error);
    toast.error('Could not fetch menu items');
    throw error;
  }
  
  return data || [];
};

export const createMenuItem = async (menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(menuItem)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating menu item:', error);
    toast.error('Could not create menu item');
    throw error;
  }
  
  toast.success('Menu item added successfully');
  return data;
};

export const updateMenuItem = async (id: number, menuItem: Partial<MenuItem>): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from('menu_items')
    .update(menuItem)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating menu item:', error);
    toast.error('Could not update menu item');
    throw error;
  }
  
  toast.success('Menu item updated successfully');
  return data;
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting menu item:', error);
    toast.error('Could not delete menu item');
    throw error;
  }
  
  toast.success('Menu item deleted successfully');
};

// Order services
export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      customers:customer_id (name),
      employees:employee_id (name)
    `);
  
  if (error) {
    console.error('Error fetching orders:', error);
    toast.error('Could not fetch orders');
    throw error;
  }
  
  // Transform the data to match the expected structure
  const transformedOrders = data.map(order => ({
    id: order.id,
    customer_id: order.customer_id,
    employee_id: order.employee_id,
    order_date: order.order_date,
    customerName: order.customers?.name,
    employeeName: order.employees?.name,
    total: 0 // Will be calculated after fetching order items
  }));

  // Calculate the total for each order
  for (let order of transformedOrders) {
    const orderItems = await getOrderItemsByOrderId(order.id);
    order.total = orderItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  }
  
  return transformedOrders;
};

export const getOrderById = async (id: number): Promise<Order | undefined> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      customers:customer_id (name),
      employees:employee_id (name)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching order:', error);
    return undefined;
  }
  
  // Transform the data to match the expected structure
  const order: Order = {
    id: data.id,
    customer_id: data.customer_id,
    employee_id: data.employee_id,
    order_date: data.order_date,
    customerName: data.customers?.name,
    employeeName: data.employees?.name,
    total: 0 // Will be calculated after fetching order items
  };

  // Calculate the total for the order
  const orderItems = await getOrderItemsByOrderId(order.id);
  order.total = orderItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  
  return order;
};

export const createOrder = async (order: Omit<Order, 'id' | 'customerName' | 'employeeName' | 'total'>): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating order:', error);
    toast.error('Could not create order');
    throw error;
  }
  
  toast.success('Order created successfully');
  return data;
};

// Order item services
export const getOrderItems = async (): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      menu_items:item_id (name, price)
    `);
  
  if (error) {
    console.error('Error fetching order items:', error);
    toast.error('Could not fetch order items');
    throw error;
  }
  
  // Transform the data to match the expected structure
  const transformedOrderItems = data.map(item => ({
    id: item.id,
    order_id: item.order_id,
    item_id: item.item_id,
    quantity: item.quantity,
    itemName: item.menu_items?.name,
    price: item.menu_items?.price
  }));
  
  return transformedOrderItems;
};

export const getOrderItemsByOrderId = async (orderId: number): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      menu_items:item_id (name, price)
    `)
    .eq('order_id', orderId);
  
  if (error) {
    console.error('Error fetching order items by order ID:', error);
    toast.error('Could not fetch order items');
    throw error;
  }
  
  // Transform the data to match the expected structure
  const transformedOrderItems = data.map(item => ({
    id: item.id,
    order_id: item.order_id,
    item_id: item.item_id,
    quantity: item.quantity,
    itemName: item.menu_items?.name,
    price: item.menu_items?.price
  }));
  
  return transformedOrderItems;
};

export const createOrderItem = async (orderItem: Omit<OrderItem, 'id' | 'itemName' | 'price'>): Promise<OrderItem> => {
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItem)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating order item:', error);
    toast.error('Could not add item to order');
    throw error;
  }
  
  return data;
};

// Dashboard services
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Get total orders count
    const { count: totalOrders, error: ordersError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });
    
    if (ordersError) throw ordersError;
    
    // Get total customers count
    const { count: totalCustomers, error: customersError } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });
    
    if (customersError) throw customersError;
    
    // Calculate total revenue
    const { data: orders, error: ordersFetchError } = await supabase
      .from('orders')
      .select('id');
    
    if (ordersFetchError) throw ordersFetchError;
    
    let totalRevenue = 0;
    
    // For each order, calculate its total
    for (const order of orders) {
      const orderItems = await getOrderItemsByOrderId(order.id);
      const orderTotal = orderItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
      totalRevenue += orderTotal;
    }
    
    // Get popular items
    // This is a bit more complex - we need to count occurrences of each menu item
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .select(`
        item_id,
        menu_items:item_id (name),
        quantity
      `);
    
    if (orderItemsError) throw orderItemsError;
    
    // Count occurrences of each menu item
    const itemCounts: Record<string, { name: string, count: number }> = {};
    
    orderItems.forEach(item => {
      const itemName = item.menu_items?.name;
      if (itemName) {
        if (!itemCounts[itemName]) {
          itemCounts[itemName] = { name: itemName, count: 0 };
        }
        itemCounts[itemName].count += item.quantity;
      }
    });
    
    const popularItems = Object.values(itemCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      totalOrders: totalOrders || 0,
      totalCustomers: totalCustomers || 0,
      totalRevenue,
      popularItems
    };
    
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    toast.error('Could not load dashboard statistics');
    
    // Return empty stats in case of error
    return {
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: 0,
      popularItems: []
    };
  }
};
