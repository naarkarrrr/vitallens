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

export default function PrescriptionsNewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Prescription</CardTitle>
        <CardDescription>Fill out the form to add a new prescription for an encounter.</CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="drug_name">Drug Name</Label>
              <Input id="drug_name" placeholder="e.g., Amoxicillin" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" placeholder="e.g., 500mg" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Input id="frequency" placeholder="e.g., Twice a day" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g., 7 days" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="route">Route</Label>
              <Input id="route" placeholder="e.g., Oral" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Prescription</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
