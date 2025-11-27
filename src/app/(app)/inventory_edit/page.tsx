import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { inventory } from "@/lib/placeholder-data"

export default function InventoryEditPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add/Edit Inventory Item</CardTitle>
        <CardDescription>Fill out the form to manage an inventory item.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
        <div className="grid gap-2">
            <Label htmlFor="item-select">Select Item to Edit (Optional)</Label>
            <Select>
              <SelectTrigger id="item-select">
                <SelectValue placeholder="Or create a new item..." />
              </SelectTrigger>
              <SelectContent>
                {inventory.map(item => <SelectItem key={item.itemId} value={item.itemId}>{item.item_name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="item_name">Item Name</Label>
              <Input id="item_name" placeholder="e.g., Aspirin 81mg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier_id">Supplier ID</Label>
              <Input id="supplier_id" placeholder="e.g., SUP01" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity_available">Quantity Available</Label>
              <Input id="quantity_available" type="number" placeholder="5000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reorder_level">Reorder Level</Label>
              <Input id="reorder_level" type="number" placeholder="1000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="min_required">Minimum Required</Label>
              <Input id="min_required" type="number" placeholder="500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead_time_days">Lead Time (Days)</Label>
              <Input id="lead_time_days" type="number" placeholder="7" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Item</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
