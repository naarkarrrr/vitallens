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
import { staff } from "@/lib/placeholder-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StaffListPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Staff Management</CardTitle>
                <CardDescription>
                View and manage all hospital staff members.
                </CardDescription>
            </div>
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Staff
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Shift
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
                <TableRow key={member.staffId}>
                    <TableCell className="hidden sm:table-cell">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://picsum.photos/seed/${member.staffId}/100/100`} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role} {member.specialization && `(${member.specialization})`}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant={member.duty_status === 'On Duty' ? 'default' : 'outline'} className={member.duty_status === 'On Duty' ? 'bg-green-500 text-white' : ''}>
                            {member.duty_status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{member.shift_start} - {member.shift_end}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{staff.length}</strong> staff members
        </div>
      </CardFooter>
    </Card>
  )
}
