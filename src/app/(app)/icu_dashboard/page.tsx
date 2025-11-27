import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Bed, User, CircleDot, Monitor, HeartPulse, Wind } from "lucide-react"
  import { cn } from "@/lib/utils"
  import { beds } from "@/lib/placeholder-data"
  
  const statusColors = {
    Available: "bg-green-100 border-green-400 text-green-800",
    Occupied: "bg-red-100 border-red-400 text-red-800",
    Cleaning: "bg-yellow-100 border-yellow-400 text-yellow-800",
  }
  
  const icuBeds = beds.filter(b => b.ward === 'ICU');
  
  export default function IcuDashboardPage() {
    const occupiedBeds = icuBeds.filter(b => b.status === 'Occupied').length;
    const availableBeds = icuBeds.filter(b => b.status === 'Available').length;
  
    return (
      <div className="grid gap-6">
          <Card>
              <CardHeader>
                  <CardTitle>ICU Dashboard</CardTitle>
                  <CardDescription>Real-time status of the Intensive Care Unit.</CardDescription>
              </CardHeader>
          </Card>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total ICU Beds</CardTitle>
                      <Bed className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{icuBeds.length}</div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Occupied Beds</CardTitle>
                      <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{occupiedBeds}</div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
                      <CircleDot className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{availableBeds}</div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ventilators in Use</CardTitle>
                      <Wind className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-xs text-muted-foreground">out of 4 available</p>
                  </CardContent>
              </Card>
          </div>
  
          <Card>
              <CardHeader>
                  <CardTitle>ICU Bed Status</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {icuBeds.map(bed => (
                          <div key={bed.bedId} className={cn("p-4 rounded-lg border-2", statusColors[bed.status])}>
                              <div className="flex justify-between items-center">
                                  <h4 className="font-bold text-lg">{bed.bedId}</h4>
                                  <span className="text-sm font-medium">{bed.status}</span>
                              </div>
                              {bed.status === 'Occupied' && (
                                  <div className="mt-2 text-sm">
                                      <p><strong>Patient:</strong> {bed.patient_id}</p>
                                      <div className="flex items-center gap-4 mt-2">
                                          <div className="flex items-center gap-1" title="Heart Rate"><HeartPulse className="h-4 w-4" /> 78</div>
                                          <div className="flex items-center gap-1" title="Blood Pressure"><Monitor className="h-4 w-4" /> 120/80</div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
    )
  }
  