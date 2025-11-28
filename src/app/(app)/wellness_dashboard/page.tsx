
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { patients } from "@/lib/placeholder-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, Bar, BarChart as BarChartComponent, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { HeartPulse, Weight, Footprints, BedDouble } from "lucide-react";

const bmiData = [
    { month: 'Jan', bmi: 24.5 }, { month: 'Feb', bmi: 24.7 }, { month: 'Mar', bmi: 24.6 },
    { month: 'Apr', bmi: 24.8 }, { month: 'May', bmi: 24.5 }, { month: 'Jun', bmi: 24.3 },
];
const activityData = [
    { day: 'Mon', steps: 8200 }, { day: 'Tue', steps: 9500 }, { day: 'Wed', steps: 7800 },
    { day: 'Thu', steps: 10200 }, { day: 'Fri', steps: 6500 }, { day: 'Sat', steps: 12400 }, { day: 'Sun', steps: 8800 },
];
const sleepData = [
    { day: 'Mon', hours: 7.5 }, { day: 'Tue', hours: 6.8 }, { day: 'Wed', hours: 8.1 },
    { day: 'Thu', hours: 7.2 }, { day: 'Fri', hours: 6.5 }, { day: 'Sat', hours: 8.5 }, { day: 'Sun', hours: 7.8 },
];

export default function WellnessDashboardPage() {
    return (
      <div className="grid gap-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>Personal Wellness Dashboard</CardTitle>
                    <CardDescription>
                        View trends for vitals, BMI, sleep, and activity levels for a selected patient.
                    </CardDescription>
                </div>
                 <Select>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                        {patients.map(p => (
                            <SelectItem key={p.patientId} value={p.patientId}>{p.first_name} {p.last_name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Heart Rate</CardTitle>
                    <HeartPulse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">76 bpm</div>
                    <p className="text-xs text-muted-foreground">within normal range</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Current BMI</CardTitle>
                    <Weight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">24.3</div>
                     <p className="text-xs text-muted-foreground">Healthy weight</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Daily Steps</CardTitle>
                    <Footprints className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">9,200</div>
                     <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Sleep</CardTitle>
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">7.4 hrs</div>
                     <p className="text-xs text-muted-foreground">Meeting sleep goals</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
             <Card>
                <CardHeader>
                    <CardTitle>BMI Trend (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                        <AreaChart data={bmiData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis domain={['auto', 'auto']} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="bmi" stroke="hsl(var(--primary))" fill="hsla(var(--primary), 0.2)" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Activity (Steps this Week)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                        <BarChartComponent data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="steps" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChartComponent>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    )
  }
