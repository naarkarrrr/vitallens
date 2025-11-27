import Link from "next/link"
import { PlusCircle } from "lucide-react"

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
import { equipment } from "@/lib/placeholder-data"

export default function EquipmentListPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Equipment Tracking</CardTitle>
                <CardDescription>
                Monitor and manage all medical equipment.
                </CardDescription>
            </div>
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Equipment
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Serviced</TableHead>
              <TableHead className="hidden md:table-cell">Usage Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
                <TableRow key={item.equipmentId}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                        <Badge variant={item.status === 'Available' ? 'default' : 'secondary'} className={item.status === 'Available' ? 'bg-green-500' : item.status === 'In Use' ? 'bg-blue-500' : 'bg-yellow-500'}>
                            {item.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(item.last_serviced).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.usage_count}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{equipment.length}</strong> items
        </div>
      </CardFooter>
    </Card>
  )
}
