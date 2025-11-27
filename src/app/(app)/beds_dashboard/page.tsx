import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bed, User, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"
import { beds } from "@/lib/placeholder-data"

const statusColors = {
  Available: "bg-green-100 border-green-400 text-green-800",
  Occupied: "bg-red-100 border-red-400 text-red-800",
  Cleaning: "bg-yellow-100 border-yellow-400 text-yellow-800",
}

const statusIcons = {
    Available: <CircleDot className="h-4 w-4" />,
    Occupied: <User className="h-4 w-4" />,
    Cleaning: <Bed className="h-4 w-4" />,
}

export default function BedsDashboardPage() {
  const wards = [...new Set(beds.map(b => b.ward))];

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Bed Management Dashboard</CardTitle>
                <CardDescription>Live overview of bed availability and status.</CardDescription>
            </CardHeader>
        </Card>

        {wards.map(ward => (
            <Card key={ward}>
                <CardHeader>
                    <CardTitle>{ward} Ward</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {beds.filter(b => b.ward === ward).map(bed => (
                            <div key={bed.bedId} className={cn("p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2", statusColors[bed.status])}>
                                <div className="flex items-center gap-2">
                                    <Bed className="h-6 w-6" />
                                    <span className="font-bold text-lg">{bed.bedId}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    {statusIcons[bed.status]}
                                    <span>{bed.status}</span>
                                </div>
                                {bed.status === 'Occupied' && (
                                    <p className="text-xs">Patient: {bed.patient_id}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  )
}
