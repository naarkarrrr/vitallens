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
import { patients } from "@/lib/placeholder-data"

export default function PatientsListPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Patients</CardTitle>
                <CardDescription>
                Manage your patients and view their health records.
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
                    <Link href="/patients_new">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Patient
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
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="hidden md:table-cell">Age</TableHead>
              <TableHead className="hidden md:table-cell">
                Chronic Conditions
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
                <TableRow key={patient.patientId}>
                    <TableCell className="font-medium">{patient.first_name} {patient.last_name}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        {patient.chronic_conditions.map(c => <Badge key={c} variant="outline" className="mr-1">{c}</Badge>)}
                    </TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/patients_view">View</Link>
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{patients.length}</strong> patients
        </div>
      </CardFooter>
    </Card>
  )
}
