
'use server';
/**
 * @fileOverview AI flow for checking medicine stock.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { inventory } from '@/lib/placeholder-data';

export const CheckMedicineStockInputSchema = z.object({
    medicineName: z.string(),
});
export type CheckMedicineStockInput = z.infer<typeof CheckMedicineStockInputSchema>;

export const CheckMedicineStockOutputSchema = z.object({
    itemName: z.string(),
    quantity: z.number(),
    status: z.string(),
    reorderLevel: z.number(),
    supplierId: z.string(),
});
export type CheckMedicineStockOutput = z.infer<typeof CheckMedicineStockOutputSchema>;

export async function checkMedicineStock(input: CheckMedicineStockInput): Promise<CheckMedicineStockOutput> {
  // Placeholder implementation - searches mock data
  console.log('Checking stock for:', input.medicineName);
  
  const item = inventory.find(i => i.item_name.toLowerCase() === input.medicineName.toLowerCase());

  if (!item) {
    return {
      itemName: input.medicineName,
      quantity: 0,
      status: 'Not Found',
      reorderLevel: 0,
      supplierId: 'N/A'
    };
  }

  let status = 'In Stock';
  if (item.quantity_available <= 0) {
    status = 'Out of Stock';
  } else if (item.quantity_available < item.reorder_level) {
    status = 'Low Stock';
  }
  
  return { 
    itemName: item.item_name,
    quantity: item.quantity_available, 
    status: status,
    reorderLevel: item.reorder_level,
    supplierId: item.supplier_id
  };
}
