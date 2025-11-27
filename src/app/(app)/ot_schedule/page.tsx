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
import { Badge } from "@/components/ui/badge"

const otSchedule = [
    { id: 1, time: '08:00 - 10:00', procedure: 'Coronary Artery Bypass', patient: 'John Doe', surgeon: 'Dr. Carter', status: 'Scheduled' },
    { id: 2, time: '10:30 - 12:00', procedure: 'Appendectomy', patient: 'Jane Smith', surgeon: 'Dr. Lee', status: 'Scheduled' },
    { id: 3, time: '13:00 - 15:30', procedure: 'Knee Replacement', patient: 'Robert Brown', surgeon: 'Dr. Evans', status: 'In Progress' },
    { id: 4, time: '16:00 - 17:00', procedure: 'Emergency Laparotomy', patient: 'Olivia Williams', surgeon: 'Dr. Carter', status: 'Emergency' },
];

export default function OTSchedulePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Operating Theater Schedule</CardTitle>
                <CardDescription>Today's schedule for all operating theaters.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Procedure</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Surgeon</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {otSchedule.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.time}</TableCell>
                                <TableCell className="font-medium">{item.procedure}</TableCell>
                                <TableCell>{item.patient}</TableCell>
                                <TableCell>{item.surgeon}</TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={item.status === 'Emergency' ? 'destructive' : item.status === 'In Progress' ? 'default' : 'outline'}
                                        className={item.status === 'In Progress' ? 'bg-blue-500 text-white' : ''}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
