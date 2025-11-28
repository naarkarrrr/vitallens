// src/app/(app)/wellness_dashboard/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function WellnessDashboardPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal Wellness Dashboard</CardTitle>
          <CardDescription>
            View trends for vitals, BMI, sleep, and activity levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Personal Wellness Dashboard placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  