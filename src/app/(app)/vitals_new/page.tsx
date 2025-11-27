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
import { encounters } from "@/lib/placeholder-data"

export default function VitalsNewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Patient Vitals</CardTitle>
        <CardDescription>Select an encounter and fill in the patient's latest vital signs.</CardDescription>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input id="temperature" type="number" step="0.1" placeholder="36.8" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="heart_rate">Heart Rate (bpm)</Label>
              <Input id="heart_rate" type="number" placeholder="72" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="systolic_bp">Systolic BP (mmHg)</Label>
              <Input id="systolic_bp" type="number" placeholder="120" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diastolic_bp">Diastolic BP (mmHg)</Label>
              <Input id="diastolic_bp" type="number" placeholder="80" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="respiratory_rate">Respiratory Rate (/min)</Label>
              <Input id="respiratory_rate" type="number" placeholder="16" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="oxygen_saturation">O2 Saturation (%)</Label>
              <Input id="oxygen_saturation" type="number" placeholder="98" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" step="0.1" placeholder="85" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Vitals</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
