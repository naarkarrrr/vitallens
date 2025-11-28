// src/app/(app)/patient_notifications/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function PatientNotificationsPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Notification System</CardTitle>
          <CardDescription>
            Send reminders to patients for follow-ups, medication, and appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Patient Notifications placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  