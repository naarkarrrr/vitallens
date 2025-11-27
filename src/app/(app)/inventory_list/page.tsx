import Link from "next/link"
import { PlusCircle, File } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { inventory } from "@/lib/placeholder-data"
import { Progress } from "@/components/ui/progress"

export default function InventoryListPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Inventory & Pharmacy</CardTitle>
                <CardDescription>
                Manage all medical supplies and pharmaceuticals.
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button size="sm" className="h-8 gap-1" asChild>
                    <Link href="/inventory_edit">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Item
                        </span>
                    </Link>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead className="hidden md:table-cell">Quantity</TableHead>
              <TableHead className="hidden md:table-cell">Reorder Level</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => {
                const stockPercentage = (item.quantity_available / (item.reorder_level * 1.5)) * 100;
                const needsReorder = item.quantity_available < item.reorder_level;
                return (
                    <TableRow key={item.itemId} className={needsReorder ? "bg-red-50" : ""}>
                        <TableCell className="font-medium">{item.item_name}</TableCell>
                        <TableCell>
                            <Progress value={stockPercentage} className="w-32" />
                            {needsReorder && <Badge variant="destructive" className="mt-1">Reorder</Badge>}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{item.quantity_available}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.reorder_level}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/inventory_edit">Edit</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{inventory.length}</strong> items
        </div>
      </CardFooter>
    </Card>
  )
}
