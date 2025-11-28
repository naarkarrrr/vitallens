
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock audit log data
const auditLogs = [
  { id: 'LOG001', actor: 'Dr. Emily Carter', action: 'CREATE_PRESCRIPTION', timestamp: '2024-07-30T10:05:00Z', details: { patientId: 'PAT001', drug: 'Lisinopril' } },
  { id: 'LOG002', actor: 'Nurse Michael Chen', action: 'RECORD_VITALS', timestamp: '2024-07-30T09:45:00Z', details: { patientId: 'PAT001' } },
  { id: 'LOG003', actor: 'Admin', action: 'UPDATE_STAFF', timestamp: '2024-07-30T09:30:00Z', details: { staffId: 'STF003', field: 'duty_status' } },
  { id: 'LOG004', actor: 'Dr. Sarah Lee', action: 'CREATE_ENCOUNTER', timestamp: '2024-07-29T14:00:00Z', details: { patientId: 'PAT002' } },
  { id: 'LOG005', actor: 'System', action: 'AUTO_UPDATE_INVENTORY', timestamp: '2024-07-29T12:00:00Z', details: { itemId: 'INV002', quantityChange: -10 } },
];

export default function AuditLogsListPage() {
    const [filter, setFilter] = useState('All');
    
    const filteredLogs = auditLogs.filter(log => {
        if (filter === 'All') return true;
        if (filter === 'Doctor' && log.actor.startsWith('Dr.')) return true;
        if (filter === 'Nurse' && log.actor.startsWith('Nurse')) return true;
        if (filter === 'System' && log.actor === 'System') return true;
        return false;
    });

    const getActionBadge = (action: string) => {
        if (action.includes('CREATE')) return 'bg-blue-500 text-white';
        if (action.includes('UPDATE')) return 'bg-yellow-500 text-white';
        if (action.includes('DELETE')) return 'bg-red-500 text-white';
        return 'bg-gray-500 text-white';
    };
    
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>
                Track create, update, and delete events across all major modules for governance and security.
            </CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Roles</SelectItem>
                    <SelectItem value="Doctor">Doctors</SelectItem>
                    <SelectItem value="Nurse">Nurses</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
           <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Actor</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLogs.map(log => (
                        <TableRow key={log.id}>
                            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                            <TableCell className="font-medium">{log.actor}</TableCell>
                            <TableCell>
                                <Badge variant="default" className={getActionBadge(log.action)}>{log.action}</Badge>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{JSON.stringify(log.details)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
           </Table>
        </CardContent>
      </Card>
    )
  }
