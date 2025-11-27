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
  import { Shield, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const recentClaims = [
    { id: 'CLM001', patient: 'Liam Johnson', provider: 'Blue Cross', amount: '$250.00', status: 'Approved' },
    { id: 'CLM002', patient: 'Olivia Smith', provider: 'Aetna', amount: '$150.00', status: 'Submitted' },
    { id: 'CLM003', patient: 'Noah Williams', provider: 'Cigna', amount: '$350.00', status: 'Approved' },
    { id: 'CLM004', patient: 'Emma Brown', provider: 'UnitedHealth', amount: '$450.00', status: 'Denied' },
]

export default function InsuranceDashboardPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Insurance Claims Dashboard</CardTitle>
                    <CardDescription>Monitor and manage insurance claims processing.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Claims Approved (Month)</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,204</div>
                        <p className="text-xs text-muted-foreground">85% approval rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Claims Pending</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">152</div>
                        <p className="text-xs text-muted-foreground">Awaiting provider response</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Claims Denied (Month)</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">88</div>
                        <p className="text-xs text-muted-foreground">Requires review</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Claims</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Claim ID</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Provider</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentClaims.map(claim => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium">{claim.id}</TableCell>
                                    <TableCell>{claim.patient}</TableCell>
                                    <TableCell>{claim.provider}</TableCell>
                                    <TableCell>{claim.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={claim.status === 'Approved' ? 'default' : claim.status === 'Submitted' ? 'secondary' : 'destructive'} className={claim.status === 'Approved' ? 'bg-green-500' : ''}>
                                            {claim.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
