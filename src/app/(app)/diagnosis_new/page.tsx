import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { encounters } from "@/lib/placeholder-data"

export default function DiagnosisNewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Diagnosis</CardTitle>
        <CardDescription>Record a diagnosis for a patient encounter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="encounter">Encounter</Label>
            <Select>
              <SelectTrigger id="encounter">
                <SelectValue placeholder="Select an active encounter" />
              </SelectTrigger>
              <SelectContent>
                {encounters.map(e => <SelectItem key={e.encounterId} value={e.encounterId}>Encounter {e.encounterId} - {new Date(e.date_time_in).toLocaleDateString()}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea id="symptoms" placeholder="Describe the patient's symptoms..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="provisional_diagnosis">Provisional Diagnosis</Label>
            <Input id="provisional_diagnosis" placeholder="e.g., Acute Bronchitis" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="final_diagnosis">Final Diagnosis</Label>
              <Input id="final_diagnosis" placeholder="e.g., Viral Pharyngitis" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icd10_code">ICD-10 Code</Label>
              <Input id="icd10_code" placeholder="e.g., J02.9" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Diagnosis</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
