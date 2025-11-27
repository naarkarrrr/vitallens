import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { patients, encounters } from "@/lib/placeholder-data"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PatientsViewPage() {
  const patient = patients[0];
  const patientEncounters = encounters.filter(e => e.patient_id === patient.patientId);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>View Patient Details</CardTitle>
              <CardDescription>Select a patient to view their information.</CardDescription>
            </div>
            <div className="w-full max-w-sm">
                <Label htmlFor="patient-select" className="sr-only">Select Patient</Label>
                <Select>
                    <SelectTrigger id="patient-select">
                        <SelectValue placeholder="Select a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                        {patients.map(p => (
                            <SelectItem key={p.patientId} value={p.patientId}>{p.first_name} {p.last_name} ({p.patientId})</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>{patient.first_name} {patient.last_name}</CardTitle>
                    <CardDescription>Patient ID: {patient.patientId}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="text-sm"><strong>Gender:</strong> {patient.gender}</div>
                    <div className="text-sm"><strong>DoB:</strong> {patient.dob} ({patient.age} years)</div>
                    <Separator />
                    <div className="text-sm"><strong>Email:</strong> {patient.email}</div>
                    <div className="text-sm"><strong>Phone:</strong> {patient.phone}</div>
                    <div className="text-sm"><strong>Address:</strong> {patient.address}</div>
                    <Separator />
                    <div className="text-sm">
                        <strong>Emergency Contact:</strong> 
                        <p className="pl-2">{patient.emergency_contact.name} ({patient.emergency_contact.relationship})</p>
                        <p className="pl-2">{patient.emergency_contact.phone}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Allergies</h4>
                        {patient.allergies.length > 0 ? patient.allergies.map(a => <Badge key={a} variant="destructive" className="mr-1">{a}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Chronic Conditions</h4>
                        {patient.chronic_conditions.length > 0 ? patient.chronic_conditions.map(c => <Badge key={c} variant="secondary" className="mr-1">{c}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Encounter History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {patientEncounters.map(encounter => (
                            <div key={encounter.encounterId} className="border p-4 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold">{encounter.department} - {encounter.encounter_type}</h4>
                                        <p className="text-sm text-muted-foreground">{new Date(encounter.date_time_in).toLocaleString()}</p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href="/encounters_view">View Encounter</Link>
                                    </Button>
                                </div>
                                <p className="text-sm mt-2"><strong>Reason:</strong> {encounter.reason_for_visit}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
