import {
  Card,
  CardContent,
  CardDescription,
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
import { staff } from "@/lib/placeholder-data"
import { Badge } from "@/components/ui/badge"

export default function StaffSchedulePage() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Staff Schedule</CardTitle>
                <CardDescription>Weekly schedule for all staff members.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Staff Member</TableHead>
                            {days.map(day => <TableHead key={day}>{day}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staff.map(member => (
                            <TableRow key={member.staffId}>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{member.name}</span>
                                        <span className="text-xs text-muted-foreground">{member.role}</span>
                                    </div>
                                </TableCell>
                                {days.map(day => (
                                    <TableCell key={day}>
                                        {member.duty_status === 'On Duty' ? (
                                            <Badge variant="secondary">{member.shift_start} - {member.shift_end}</Badge>
                                        ) : (
                                            <Badge variant="outline">{member.duty_status}</Badge>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
