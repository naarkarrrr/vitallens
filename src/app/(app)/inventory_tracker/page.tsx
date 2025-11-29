'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, Circle, Loader, Truck, PackageCheck } from 'lucide-react';
import { inventoryOrders } from '@/lib/placeholder-data';
import type { InventoryOrder } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function InventoryTrackerPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(inventoryOrders[0]?.orderId || null);
  const [order, setOrder] = useState<InventoryOrder | null>(inventoryOrders[0] || null);
  const { toast } = useToast();

  useEffect(() => {
    const foundOrder = inventoryOrders.find(o => o.orderId === selectedOrderId);
    setOrder(foundOrder || null);
  }, [selectedOrderId]);

  // Simulate real-time progress for demonstration
  useEffect(() => {
    if (order && order.status === 'in-progress') {
        const currentIndex = order.stages_list.indexOf(order.current_stage);
        if (currentIndex < order.stages_list.length - 1) {
            const interval = setInterval(() => {
                setOrder(prevOrder => {
                    if (!prevOrder) return null;
                    const nextIndex = prevOrder.stages_list.indexOf(prevOrder.current_stage) + 1;
                    if (nextIndex < prevOrder.stages_list.length) {
                        const newStage = prevOrder.stages_list[nextIndex];
                        const isDelivered = newStage === 'Delivered';
                        if (isDelivered) {
                            toast({
                                title: 'Delivery Successful!',
                                description: `Order ${prevOrder.orderId} for ${prevOrder.item_name} has been delivered.`,
                                action: <PackageCheck className="h-5 w-5 text-green-500" />
                            });
                            clearInterval(interval);
                        }
                        return { ...prevOrder, current_stage: newStage, status: isDelivered ? 'delivered' : 'in-progress' };
                    }
                    return prevOrder;
                });
            }, 5000); // Progress every 5 seconds
            return () => clearInterval(interval);
        }
    }
  }, [order, toast]);

  const getStageIcon = (stage: string, currentStage: string, stages: string[]) => {
    const stageIndex = stages.indexOf(stage);
    const currentIndex = stages.indexOf(currentStage);

    if (stageIndex < currentIndex) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
    if (stageIndex === currentIndex) {
      return <Loader className="h-6 w-6 text-blue-500 animate-spin" />;
    }
    return <Circle className="h-6 w-6 text-muted-foreground" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Delivery Tracker</CardTitle>
        <CardDescription>
          View real-time delivery status for inventory orders, similar to an e-commerce tracking system.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 md:w-1/3">
          <Select value={selectedOrderId || ''} onValueChange={setSelectedOrderId}>
            <SelectTrigger>
              <SelectValue placeholder="Select an order to track..." />
            </SelectTrigger>
            <SelectContent>
              {inventoryOrders.map(o => (
                <SelectItem key={o.orderId} value={o.orderId}>
                  {o.orderId} - {o.item_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {order && (
          <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="h-6 w-6" /> Tracking Order: {order.orderId}
                    </CardTitle>
                    <CardDescription>
                        Item: {order.item_name} | Quantity: {order.quantity_ordered}
                    </CardDescription>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Expected Delivery</p>
                    <p className="font-medium">{new Date(order.expected_delivery_time).toLocaleDateString()}</p>
                </div>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {order.stages_list.map((stage, index) => {
                  const currentIndex = order.stages_list.indexOf(order.current_stage);
                  const isCompleted = index < currentIndex;
                  const isCurrent = index === currentIndex;
                  
                  return (
                    <div key={stage} className="flex gap-6 items-start">
                      <div className="z-10 bg-background flex items-center justify-center">
                        {getStageIcon(stage, order.current_stage, order.stages_list)}
                      </div>
                      <div className={cn("pb-12", isCompleted || isCurrent ? 'font-semibold' : 'text-muted-foreground')}>
                        <p className="text-md">{stage}</p>
                        <p className="text-xs">
                          {isCompleted && "Completed"}
                          {isCurrent && "In Progress..."}
                        </p>
                      </div>
                      {index < order.stages_list.length - 1 && (
                        <div className={cn(
                          "absolute left-[2.9rem] top-2 h-full w-0.5 transform -translate-x-1/2",
                          isCompleted ? "bg-green-500" : "bg-muted"
                        )} />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
