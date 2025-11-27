import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Wifi, HeartPulse, Thermometer, Wind } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const iotDevices = [
    { id: 'VITALS-MON-01', patient: 'John Doe', location: 'Bed B-101', status: 'Online', heartRate: '78 bpm', bp: '130/85 mmHg', temp: '36.9°C' },
    { id: 'VITALS-MON-02', patient: 'Jane Smith', location: 'ICU-02', status: 'Online', heartRate: '85 bpm', bp: '122/80 mmHg', temp: '37.1°C' },
    { id: 'VITALS-MON-03', patient: 'N/A', location: 'Storage', status: 'Offline', heartRate: 'N/A', bp: 'N/A', temp: 'N/A' },
]

export default function IotIntegrationPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>IoT Vitals Integration</CardTitle>
                <CardDescription>Placeholder for monitoring real-time data from IoT vitals devices.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                {iotDevices.map(device => (
                    <Card key={device.id}>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle>{device.id}</CardTitle>
                                <CardDescription>Location: {device.location} | Patient: {device.patient}</CardDescription>
                            </div>
                            <Badge className={device.status === 'Online' ? 'bg-green-500 text-white' : ''}>
                                <Wifi className="h-3 w-3 mr-1" />
                                {device.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2" title="Heart Rate">
                                    <HeartPulse className="h-5 w-5 text-red-500" />
                                    <span>{device.heartRate}</span>
                                </div>
                                <div className="flex items-center gap-2" title="Blood Pressure">
                                    <span className="font-semibold">BP</span>
                                    <span>{device.bp}</span>
                                </div>
                                <div className="flex items-center gap-2" title="Temperature">
                                    <Thermometer className="h-5 w-5 text-blue-500" />
                                    <span>{device.temp}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
