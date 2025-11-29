
'use client';
import {
    Activity,
    ArrowUpRight,
    Bed,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
    AlertTriangle,
    ShieldAlert,
    Building
  } from "lucide-react"
  
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { inventory } from "@/lib/placeholder-data"
  
  const bedOccupancyData = [
    { name: "Cardiology", occupied: 8, total: 10 },
    { name: "Pediatrics", occupied: 12, total: 15 },
    { name: "ICU", occupied: 5, total: 6 },
    { name: "General", occupied: 25, total: 30 },
    { name: "Orthopedics", occupied: 10, total: 12 },
  ]

  const lowStockItems = inventory.filter(item => item.quantity_available < item.reorder_level).slice(0, 3);


  export default function AdminHomePage() {
    return (
        <div className="flex w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Patients
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
                  <Bed className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86%</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Encounters</CardTitle>
                    <CardDescription>
                      Recent patient encounters from the last 24 hours.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/encounters_list">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden xl:table-column">
                          Type
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Department
                        </TableHead>
                        <TableHead className="text-right">Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          OPD
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          Cardiology
                        </TableCell>
                        <TableCell className="text-right">Annual Checkup</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Olivia Smith</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          ER
                        </TableCell>
                        <TableCell className="hidden xl-table-column">
                          <Badge className="text-xs" variant="outline">
                            Admitted
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          Emergency
                        </TableCell>
                        <TableCell className="text-right">Minor Injury</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>AI-driven and operational alerts requiring attention.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4 p-3 rounded-md bg-yellow-50 border border-yellow-200">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">High-Risk Patient Detected</p>
                      <p className="text-xs text-muted-foreground">Patient PAT001 flagged by decision engine.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-md bg-red-50 border border-red-200">
                    <Bed className="h-5 w-5 text-red-600" />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Bed Shortage Predicted</p>
                      <p className="text-xs text-muted-foreground">Forecast indicates 95% occupancy in 48h.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Bed Occupancy by Ward</CardTitle>
                  <CardDescription>Live view of bed allocation across major wards.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bedOccupancyData} layout="vertical" margin={{ left: 10 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="hsl(var(--foreground))" axisLine={false} tickLine={false} />
                      <Bar dataKey="occupied" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
               <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>Pharmacy & Inventory Watchlist</CardTitle>
                  <CardDescription>Items that are running low and require reordering.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Quantity Left</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map(item => (
                        <TableRow key={item.itemId}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-destructive" />
                            {item.item_name}
                          </TableCell>
                          <TableCell>{item.quantity_available}</TableCell>
                          <TableCell>{item.reorder_level}</TableCell>
                          <TableCell className="text-right">
                             <Button asChild size="sm" variant="outline">
                              <Link href="/inventory_orders">
                                Reorder
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
    )
  }
  
