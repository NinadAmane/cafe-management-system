
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCustomers, getEmployees, getMenuItems, createOrder, createOrderItem } from '@/services/dataService';
import { Customer, Employee, MenuItem, Order } from '@/types/cafe';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface OrderFormProps {
  onSubmitSuccess: () => void;
}

const orderItemSchema = z.object({
  item_id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  price: z.coerce.number().positive().optional(),
  name: z.string().optional()
});

const orderSchema = z.object({
  customer_id: z.coerce.number().int().positive(),
  employee_id: z.coerce.number().int().positive(),
  items: z.array(orderItemSchema).min(1, "Order must have at least one item")
});

type OrderFormValues = z.infer<typeof orderSchema>;

const OrderForm: React.FC<OrderFormProps> = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_id: 0,
      employee_id: 0,
      items: [{ item_id: 0, quantity: 1 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersData, employeesData, menuItemsData] = await Promise.all([
          getCustomers(),
          getEmployees(),
          getMenuItems()
        ]);
        
        setCustomers(customersData);
        setEmployees(employeesData);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error('Error fetching form data:', error);
        toast.error('Failed to load form data');
      }
    };

    fetchData();
  }, []);

  const calculateSubtotal = (itemId: number, quantity: number) => {
    const menuItem = menuItems.find(item => item.id === itemId);
    return menuItem ? menuItem.price * quantity : 0;
  };

  const calculateTotal = () => {
    let total = 0;
    const items = form.getValues().items;
    
    items.forEach(item => {
      if (item.item_id) {
        total += calculateSubtotal(item.item_id, item.quantity);
      }
    });
    
    return total;
  };

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      // Create the order first
      const newOrder: Order = await createOrder({
        customer_id: data.customer_id,
        employee_id: data.employee_id,
        order_date: new Date().toISOString()
      });

      // Then create all the order items
      const promises = data.items.map(item => 
        createOrderItem({
          order_id: newOrder.id,
          item_id: item.item_id,
          quantity: item.quantity
        })
      );
      
      await Promise.all(promises);
      toast.success('Order created successfully');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemPrice = (itemId: number) => {
    const menuItem = menuItems.find(item => item.id === itemId);
    return menuItem ? menuItem.price : 0;
  };

  const addItem = () => {
    append({ item_id: 0, quantity: 1 });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employees.map(employee => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Order Items</h3>
          
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 gap-2 mb-4 items-end">
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name={`items.${index}.item_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value?.toString() || "0"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {menuItems.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name} (${item.price.toFixed(2)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qty</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="col-span-3 text-right">
                <FormLabel>Subtotal</FormLabel>
                <div className="h-10 flex items-center justify-end font-medium">
                  ${calculateSubtotal(
                    form.watch(`items.${index}.item_id`), 
                    form.watch(`items.${index}.quantity`)
                  ).toFixed(2)}
                </div>
              </div>
              
              <div className="col-span-2 pb-1">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addItem}
            className="mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onSubmitSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Order'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
