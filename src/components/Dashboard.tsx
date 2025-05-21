
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from '@/services/dataService';
import { DashboardStats } from '@/types/cafe';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#8B5A2B', '#D2B48C', '#A52A2A', '#F5E6D8', '#6B4226'];

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="flex justify-center items-center h-full">No data available</div>;
  }

  const popularItemsData = stats.popularItems.map(item => ({
    name: item.name,
    value: item.count
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Café Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your café management system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>All orders processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-cafe-dark">{stats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Customers</CardTitle>
            <CardDescription>Registered customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-cafe-dark">{stats.totalCustomers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total sales revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-cafe-dark">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most ordered menu items</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={popularItemsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {popularItemsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common cafe operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-md hover:bg-secondary/80 cursor-pointer transition-colors">
                <h3 className="font-medium">Create New Order</h3>
                <p className="text-sm text-muted-foreground">Process a new customer order</p>
              </div>
              <div className="p-4 bg-secondary rounded-md hover:bg-secondary/80 cursor-pointer transition-colors">
                <h3 className="font-medium">Add Menu Item</h3>
                <p className="text-sm text-muted-foreground">Add a new product to the menu</p>
              </div>
              <div className="p-4 bg-secondary rounded-md hover:bg-secondary/80 cursor-pointer transition-colors">
                <h3 className="font-medium">Register Customer</h3>
                <p className="text-sm text-muted-foreground">Register a new customer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
