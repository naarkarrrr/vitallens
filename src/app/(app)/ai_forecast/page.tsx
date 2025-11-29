
'use client';

import { BarChart, LineChart as LineChartIcon } from "lucide-react"
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart as BarChartComponent, Line, LineChart as LineChartComponent, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { cn } from "@/lib/utils";

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

const monthlyAdmissionTrendData = [
    { month: "April", "Average Patients": 72.7 },
    { month: "May", "Average Patients": 73.6 },
    { month: "June", "Average Patients": 74.3 },
    { month: "July", "Average Patients": 75.2 },
    { month: "August", "Average Patients": 75.7 },
    { month: "September", "Average Patients": 74.2 },
    { month: "October", "Average Patients": 75.4 },
    { month: "November", "Average Patients": 73.8 },
    { month: "December", "Average Patients": 74.9 },
]

const correlationData = {
    labels: [
      "total_admissions",
      "ICU_patients",
      "oxygen_liters_used",
      "saline_units_used",
      "n95_used",
      "ventilators_in_use",
    ],
    matrix: [
      [1.0, 0.0016, -0.00047, 0.0052, -0.0097, 0.00095],
      [0.0016, 1.0, 0.0093, -0.0036, -0.0038, -0.0031],
      [-0.00047, 0.0093, 1.0, -0.0033, 0.016, 0.0098],
      [0.0052, -0.0036, -0.0033, 1.0, -0.0085, -0.0072],
      [-0.0097, -0.0038, 0.016, -0.0085, 1.0, 0.0031],
      [0.00095, -0.0031, 0.0098, -0.0072, 0.0031, 1.0],
    ],
};

const getBackgroundColor = (value: number) => {
    if (value >= 0.8) return 'bg-blue-900 text-white';
    if (value >= 0.6) return 'bg-blue-800 text-white';
    if (value >= 0.4) return 'bg-blue-700 text-white';
    if (value >= 0.2) return 'bg-blue-600 text-white';
    if (value > 0) return 'bg-blue-200 text-blue-900';
    return 'bg-blue-50 text-blue-900';
};


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
        <Card>
            <CardHeader>
                <CardTitle>Monthly Patient Admission Trend</CardTitle>
                <CardDescription>Historical analysis of average patient admissions per month.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-[350px] w-full">
                    <LineChartComponent data={monthlyAdmissionTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[72, 76]} tickCount={5} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="Average Patients" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChartComponent>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Correlation Matrix — Patients vs Resource Consumption</CardTitle>
                <CardDescription>Visualizing the relationships between patient metrics and resource usage.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="min-w-full divide-y divide-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/6"></TableHead>
                                {correlationData.labels.map((label) => (
                                    <TableHead key={label} className="text-xs -rotate-45 origin-left-bottom text-right h-24">
                                       <span className="inline-block translate-y-1/2">{label}</span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {correlationData.matrix.map((row, i) => (
                                <TableRow key={i}>
                                    <TableHead className="text-xs font-bold text-right">{correlationData.labels[i]}</TableHead>
                                    {row.map((value, j) => (
                                        <TableCell
                                            key={j}
                                            className={cn("text-center font-mono text-xs p-1", getBackgroundColor(value))}
                                        >
                                            {value.toFixed(4)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
