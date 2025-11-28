// src/app/(app)/system_monitor/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function SystemMonitorPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health Dashboard</CardTitle>
          <CardDescription>
            Monitor error logs, failed functions, and slow queries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>System Monitor placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  