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
import { patients, staff } from "@/lib/placeholder-data"

export default function EncountersNewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Encounter</CardTitle>
        <CardDescription>Fill out the form to log a new patient encounter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <Select>
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(p => <SelectItem key={p.patientId} value={p.patientId}>{p.first_name} {p.last_name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {staff.filter(s => s.role === 'Doctor').map(d => <SelectItem key={d.staffId} value={d.staffId}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Cardiology" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="encounter_type">Encounter Type</Label>
              <Select>
                <SelectTrigger id="encounter_type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opd">OPD</SelectItem>
                  <SelectItem value="ipd">IPD</SelectItem>
                  <SelectItem value="er">ER</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date_time_in">Date & Time In</Label>
              <Input id="date_time_in" type="datetime-local" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Textarea id="reason" placeholder="Describe the reason for the patient's visit..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Encounter</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
