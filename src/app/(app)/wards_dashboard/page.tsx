import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Building, Users, Bed } from "lucide-react"
import { beds } from "@/lib/placeholder-data"

export default function WardsDashboardPage() {
  const wardsData = beds.reduce((acc, bed) => {
    if (!acc[bed.ward]) {
      acc[bed.ward] = { total: 0, occupied: 0 };
    }
    acc[bed.ward].total++;
    if (bed.status === 'Occupied') {
      acc[bed.ward].occupied++;
    }
    return acc;
  }, {} as Record<string, { total: number; occupied: number }>);

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Wards Overview</CardTitle>
                <CardDescription>Summary of activity and occupancy across all wards.</CardDescription>
            </CardHeader>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(wardsData).map(([ward, data]) => {
                const occupancy = data.total > 0 ? Math.round((data.occupied / data.total) * 100) : 0;
                return (
                    <Card key={ward}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">{ward} Ward</CardTitle>
                            <Building className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>{data.occupied} Patients</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bed className="h-4 w-4 text-muted-foreground" />
                                    <span>{data.total} Beds</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-muted-foreground">Occupancy</span>
                                    <span className="text-sm font-bold">{occupancy}%</span>
                                </div>
                                <Progress value={occupancy} aria-label={`${occupancy}% occupancy`} />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    </div>
  )
}
