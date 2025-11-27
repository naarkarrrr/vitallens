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

export default function LabsNewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Lab Order</CardTitle>
        <CardDescription>Fill out the form to create a new lab test order.</CardDescription>
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
              <Label htmlFor="test_name">Test Name</Label>
              <Input id="test_name" placeholder="e.g., Complete Blood Count" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="test_category">Test Category</Label>
              <Input id="test_category" placeholder="e.g., Hematology" />
            </div>
          </div>
          <h3 className="text-lg font-medium pt-4">Result (for Lab Technicians)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="result_value">Result Value</Label>
              <Input id="result_value" placeholder="e.g., 4.5" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="result_unit">Result Unit</Label>
              <Input id="result_unit" placeholder="e.g., 10^3/uL" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reference_range">Reference Range</Label>
              <Input id="reference_range" placeholder="e.g., 4.0-10.0" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flag">Flag</Label>
              <Select>
                <SelectTrigger id="flag">
                  <SelectValue placeholder="Select flag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="abnormal">Abnormal</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Lab Order/Result</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
