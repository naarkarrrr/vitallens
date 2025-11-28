// src/app/(app)/pharmacy_stock_check/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function PharmacyStockCheckPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pharmacy Stock Check</CardTitle>
          <CardDescription>
            Search for medicines, view stock levels, and check for expiry alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Pharmacy Stock Check placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  