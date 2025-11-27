import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plug, Server, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function FhirApiPanelPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>FHIR/HL7 Interface Panel</CardTitle>
                <CardDescription>Placeholder for managing and monitoring the FHIR/HL7 API integration.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                        <Plug className="h-8 w-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">FHIR Endpoint Status</h3>
                            <p className="text-sm text-muted-foreground">https://api.healthcare.provider/fhir/r4</p>
                        </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Connected</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Test API Call</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="font-mono text-sm p-3 bg-muted rounded-md">
                                fhirGetPatient(patientId: "12345")
                            </div>
                            <Button>
                                <Play className="h-4 w-4 mr-2" />
                                Execute Call
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>API Response</CardTitle>
                        </CardHeader>
                        <CardContent className="font-mono text-xs p-3 bg-muted rounded-md h-32 overflow-auto">
                            <pre>
{`{
  "resourceType": "Patient",
  "id": "12345",
  "name": [{ "use": "official", "family": "Doe", "given": ["John"] }],
  "gender": "male",
  "birthDate": "1985-02-15"
}`}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}
