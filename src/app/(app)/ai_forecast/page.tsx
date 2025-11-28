'use client';

import { BarChart, LineChart } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart as BarChartComponent, Line, LineChart as LineChartComponent, CartesianGrid, XAxis, YAxis } from "recharts"

const admissionData = [
    { date: "Mon", admissions: 12 },
    { date: "Tue", admissions: 15 },
    { date: "Wed", admissions: 18 },
    { date: "Thu", admissions: 14 },
    { date: "Fri", admissions: 22 },
    { date: "Sat", admissions: 25 },
    { date: "Sun", admissions: 20 },
]

const bedShortageData = [
    { month: "Jan", shortage: 0 },
    { month: "Feb", shortage: 0 },
    { month: "Mar", shortage: 2 },
    { month: "Apr", shortage: 1 },
    { month: "May", shortage: 5 },
    { month: "Jun", shortage: 3 },
]

export default function AIForecastPage() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Forecasting</CardTitle>
                <CardDescription>Predictive analytics for hospital operations.</CardDescription>
            </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Admission Forecast</CardTitle>
                    <CardDescription>Predicted patient admissions for the next 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                        <LineChartComponent data={admissionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="admissions" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChartComponent>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bed Shortage Prediction</CardTitle>
                    <CardDescription>Predicted bed shortages over the next 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                        <BarChartComponent data={bedShortageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="shortage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChartComponent>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
