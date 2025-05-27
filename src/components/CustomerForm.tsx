
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/cafe';
import { toast } from 'sonner';

interface CustomerFormProps {
  customer?: Customer;
  onSubmitSuccess: () => void;
}

const customerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone_no: z.string().min(5, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  membership_status: z.string().min(1, { message: "Membership status is required" })
});

// Define the type based on our schema
type CustomerFormValues = z.infer<typeof customerSchema>;

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer?.name || '',
      phone_no: customer?.phone_no || '',
      address: customer?.address || '',
      membership_status: customer?.membership_status || 'Basic',
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting customer data:', data);
      
      if (customer) {
        // Update existing customer
        const { error } = await supabase
          .from('customers')
          .update({
            name: data.name,
            phone_no: data.phone_no,
            address: data.address,
            membership_status: data.membership_status
          })
          .eq('id', customer.id);
          
        if (error) {
          console.error('Error updating customer:', error);
          toast.error(`Failed to update customer: ${error.message}`);
          return;
        }
        
        toast.success('Customer updated successfully');
      } else {
        // Create new customer - use complete data object
        const customerData = {
          name: data.name,
          phone_no: data.phone_no,
          address: data.address,
          membership_status: data.membership_status
        };
        
        console.log('Creating customer with data:', customerData);
        
        const { error } = await supabase
          .from('customers')
          .insert(customerData);
          
        if (error) {
          console.error('Error creating customer:', error);
          toast.error(`Failed to create customer: ${error.message}`);
          return;
        }
        
        toast.success('Customer added successfully');
      }
      
      onSubmitSuccess();
    } catch (error: any) {
      console.error('Error saving customer:', error);
      toast.error(`Failed to save customer: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="membership_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onSubmitSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : customer ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomerForm;
