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
import { encounters, patients } from "@/lib/placeholder-data"

export default function EncountersListPage() {
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.patientId === patientId);
    return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown';
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Encounters</CardTitle>
                <CardDescription>
                Track and manage all patient encounters.
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" asChild>
                    <Link href="/encounters_new">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New Encounter
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
              <TableHead>Patient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">
                Date In
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {encounters.map((encounter) => (
                <TableRow key={encounter.encounterId}>
                    <TableCell className="font-medium">{getPatientName(encounter.patient_id)}</TableCell>
                    <TableCell>
                        <Badge variant={encounter.encounter_type === 'ER' ? 'destructive' : 'secondary'}>{encounter.encounter_type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{encounter.department}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(encounter.date_time_in).toLocaleString()}</TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/encounters_view">View</Link>
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{encounters.length}</strong> encounters
        </div>
      </CardFooter>
    </Card>
  )
}
