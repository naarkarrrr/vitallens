// src/app/(app)/billing_affordability/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function BillingAffordabilityPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Affordable Care Calculator</CardTitle>
          <CardDescription>
            Estimate treatment costs against insurance and subsidies to generate an affordability score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Billing Affordability Calculator placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  