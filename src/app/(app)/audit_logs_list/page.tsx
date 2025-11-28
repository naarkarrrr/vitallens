// src/app/(app)/audit_logs_list/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function AuditLogsListPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>
            Track create, update, and delete events across all major modules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Audit Logs placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  