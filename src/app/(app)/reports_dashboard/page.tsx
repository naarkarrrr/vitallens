import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const reports = [
    { title: "Monthly Admissions Report", description: "Summary of all patient admissions for the selected month." },
    { title: "Financial Performance Report", description: "Detailed breakdown of revenue, expenses, and profitability." },
    { title: "Bed Occupancy Rate Report", description: "Analysis of bed usage and turnover rates by ward." },
    { title: "Pharmacy Dispensing Report", description: "Tracks medication dispensing volumes and costs." },
    { title: "Lab Test Volume Report", description: "Overview of lab tests performed, categorized by type." },
    { title: "Clinical Outcomes Report", description: "Measures key clinical performance indicators." },
]

export default function ReportsDashboardPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reports Dashboard</CardTitle>
                <CardDescription>Generate and view hospital performance reports.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <Card key={report.title}>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="flex flex-col">
                                <CardTitle className="text-base">{report.title}</CardTitle>
                                <CardDescription className="text-xs mt-1">{report.description}</CardDescription>
                            </div>
                            <FileText className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Button size="sm">Generate Report</Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
