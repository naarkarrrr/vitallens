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
import { encounters, patients, vitals, diagnoses, prescriptions, labs } from "@/lib/placeholder-data"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function EncountersViewPage() {
  const encounter = encounters[0];
  const patient = patients.find(p => p.patientId === encounter.patient_id);
  const encounterVitals = vitals.find(v => v.encounter_id === encounter.encounterId);
  const encounterDiagnosis = diagnoses.find(d => d.encounter_id === encounter.encounterId);
  const encounterPrescriptions = prescriptions.filter(p => p.encounter_id === encounter.encounterId);
  const encounterLabs = labs.filter(l => l.encounter_id === encounter.encounterId);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>View Encounter Details</CardTitle>
              <CardDescription>Select an encounter to view its information.</CardDescription>
            </div>
            <div className="w-full max-w-sm">
                <Label htmlFor="encounter-select" className="sr-only">Select Encounter</Label>
                <Select>
                    <SelectTrigger id="encounter-select">
                        <SelectValue placeholder="Select an encounter..." />
                    </SelectTrigger>
                    <SelectContent>
                        {encounters.map(e => (
                            <SelectItem key={e.encounterId} value={e.encounterId}>Encounter {e.encounterId} ({new Date(e.date_time_in).toLocaleDateString()})</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {encounter && patient && (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Encounter Summary</CardTitle>
                        <CardDescription>Patient: {patient.first_name} {patient.last_name}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2 text-sm">
                        <p><strong>Date In:</strong> {new Date(encounter.date_time_in).toLocaleString()}</p>
                        <p><strong>Department:</strong> {encounter.department}</p>
                        <p><strong>Type:</strong> <Badge variant="secondary">{encounter.encounter_type}</Badge></p>
                        <p><strong>Reason:</strong> {encounter.reason_for_visit}</p>
                    </CardContent>
                </Card>
                {encounterDiagnosis && (
                    <Card>
                        <CardHeader><CardTitle>Diagnosis</CardTitle></CardHeader>
                        <CardContent className="grid gap-2 text-sm">
                            <p><strong>Symptoms:</strong> {encounterDiagnosis.symptoms}</p>
                            <p><strong>Provisional:</strong> {encounterDiagnosis.provisional_diagnosis}</p>
                            <p><strong>Final:</strong> {encounterDiagnosis.final_diagnosis}</p>
                            <p><strong>ICD-10:</strong> <Badge>{encounterDiagnosis.icd10_code}</Badge></p>
                        </CardContent>
                    </Card>
                )}
                {encounterVitals && (
                     <Card>
                        <CardHeader><CardTitle>Vitals</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Temp:</strong> {encounterVitals.temperature}°C</p>
                            <p><strong>Heart Rate:</strong> {encounterVitals.heart_rate} bpm</p>
                            <p><strong>BP:</strong> {encounterVitals.systolic_bp}/{encounterVitals.diastolic_bp} mmHg</p>
                            <p><strong>Resp. Rate:</strong> {encounterVitals.respiratory_rate}/min</p>
                            <p><strong>O2 Sat:</strong> {encounterVitals.oxygen_saturation}%</p>
                            <p><strong>Weight:</strong> {encounterVitals.weight} kg</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
                <Card>
                    <CardHeader><CardTitle>Lab Results</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Test</TableHead><TableHead>Result</TableHead><TableHead>Range</TableHead><TableHead>Flag</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {encounterLabs.map(lab => (
                                    <TableRow key={lab.labId}>
                                        <TableCell>{lab.test_name}</TableCell>
                                        <TableCell>{lab.result_value} {lab.result_unit}</TableCell>
                                        <TableCell>{lab.reference_range}</TableCell>
                                        <TableCell><Badge variant={lab.flag === 'Abnormal' ? 'destructive' : 'default'}>{lab.flag}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Prescriptions</CardTitle></CardHeader>
                    <CardContent>
                    <Table>
                            <TableHeader><TableRow><TableHead>Drug</TableHead><TableHead>Dosage</TableHead><TableHead>Frequency</TableHead><TableHead>Duration</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {encounterPrescriptions.map(p => (
                                    <TableRow key={p.prescriptionId}>
                                        <TableCell>{p.drug_name}</TableCell>
                                        <TableCell>{p.dosage}</TableCell>
                                        <TableCell>{p.frequency}</TableCell>
                                        <TableCell>{p.duration}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  )
}
