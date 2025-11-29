'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { inventory, inventoryOrders as initialOrders } from '@/lib/placeholder-data';
import type { InventoryOrder } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const initialFormState = {
  item_name: '',
  quantity_ordered: 100,
};

const defaultStages = [
  "Order Placed",
  "Supplier Processing",
  "Dispatched",
  "In Transit",
  "Arriving Soon",
  "Delivered"
];

export default function InventoryOrdersPage() {
  const [orders, setOrders] = useState<InventoryOrder[]>(initialOrders);
  const [formData, setFormData] = useState(initialFormState);
  const { toast } = useToast();

  const handleInputChange = (id: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.item_name || formData.quantity_ordered <= 0) {
        toast({
            variant: 'destructive',
            title: 'Invalid Order',
            description: 'Please select an item and specify a valid quantity.',
        });
        return;
    }
    
    // In a real app, this would be handled by a Cloud Function `createNewOrder`.
    const newOrder: InventoryOrder = {
      orderId: `ORD${(orders.length + 1).toString().padStart(3, '0')}`,
      item_name: formData.item_name,
      quantity_ordered: Number(formData.quantity_ordered),
      order_date: new Date().toISOString(),
      expected_delivery_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      current_stage: "Order Placed",
      stages_list: defaultStages,
      status: 'in-progress'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    toast({
        title: 'Order Placed',
        description: `Order ${newOrder.orderId} for ${newOrder.quantity_ordered} units of ${newOrder.item_name} has been placed.`,
    });
    setFormData(initialFormState);
  };

  const getStatusBadgeVariant = (status: 'in-progress' | 'delivered' | 'pending') => {
    switch (status) {
        case 'delivered': return 'bg-green-500';
        case 'in-progress': return 'bg-blue-500';
        default: return 'bg-yellow-500';
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Place Inventory Order</CardTitle>
          <CardDescription>
            Create a new order for low-stock or out-of-stock items from suppliers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="item_name">Select Item</Label>
                <Select value={formData.item_name} onValueChange={(value) => handleInputChange('item_name', value)}>
                    <SelectTrigger id="item_name">
                        <SelectValue placeholder="Select an inventory item..." />
                    </SelectTrigger>
                    <SelectContent>
                        {inventory.map(item => (
                            <SelectItem key={item.itemId} value={item.item_name}>{item.item_name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="quantity_ordered">Quantity</Label>
                <Input id="quantity_ordered" type="number" value={formData.quantity_ordered} onChange={(e) => handleInputChange('quantity_ordered', e.target.value)} />
            </div>
            <div className="flex items-end">
                <Button onClick={handlePlaceOrder} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Place Order
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>List of all placed inventory orders.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.orderId}>
                            <TableCell className="font-medium">{order.orderId}</TableCell>
                            <TableCell>{order.item_name}</TableCell>
                            <TableCell>{order.quantity_ordered}</TableCell>
                            <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge className={getStatusBadgeVariant(order.status) + ' text-white'}>{order.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
