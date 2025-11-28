
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Server, Database, AlertTriangle, Clock, CheckCircle } from "lucide-react";

// Mock data for system health
const healthStatus = [
    { name: 'API Gateway', status: 'Healthy', responseTime: '120ms' },
    { name: 'Firestore DB', status: 'Healthy', responseTime: '45ms' },
    { name: 'Authentication Service', status: 'Healthy', responseTime: '80ms' },
    { name: 'AI Inference Engine', status: 'Degraded', responseTime: '1500ms' },
];

const recentErrors = [
    { id: 1, function: 'runDecisionAnalysis', error: 'Timeout: LLM endpoint did not respond.', timestamp: '2 mins ago' },
    { id: 2, function: 'fhir/syncPatient', error: 'API Connection refused by remote host.', timestamp: '15 mins ago' },
    { id: 3, function: 'autoUpdateInventory', error: 'Null pointer on item ID INV-999 (not found)', timestamp: '1 hour ago' },
];

export default function SystemMonitorPage() {
    const getStatusBadge = (status: string) => {
        if (status === 'Healthy') return 'bg-green-500 text-white';
        if (status === 'Degraded') return 'bg-yellow-500 text-white';
        return 'bg-red-500 text-white';
    };

    return (
      <div className="grid gap-6">
          <Card>
            <CardHeader>
            <CardTitle>System Health Dashboard</CardTitle>
            <CardDescription>
                Monitor core service status, error logs, and performance metrics in real-time.
            </CardDescription>
            </CardHeader>
        </Card>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">API Status</CardTitle>
                    <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">All Systems Go</div>
                    <p className="text-xs text-muted-foreground">No API downtime in last 24h</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Database Latency</CardTitle>
                    <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">45ms</div>
                    <p className="text-xs text-muted-foreground">Avg. Firestore read/write</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Critical Errors (24h)</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-xs text-muted-foreground">Needs immediate attention</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Longest Query</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">450ms</div>
                    <p className="text-xs text-muted-foreground">`getPatientEncounterHistory`</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>Core Service Status</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Avg. Response Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {healthStatus.map(service => (
                                <TableRow key={service.name}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusBadge(service.status)}>{service.status}</Badge>
                                    </TableCell>
                                    <TableCell>{service.responseTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Recent Critical Error Logs</CardTitle></CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Function</TableHead>
                                <TableHead>Error Message</TableHead>
                                <TableHead>Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentErrors.map(err => (
                                <TableRow key={err.id}>
                                    <TableCell className="font-mono text-xs">{err.function}</TableCell>
                                    <TableCell className="text-red-600">{err.error}</TableCell>
                                    <TableCell>{err.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    )
  }
