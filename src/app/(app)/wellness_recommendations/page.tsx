// src/app/(app)/wellness_recommendations/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function WellnessRecommendationsPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wellness Recommendations</CardTitle>
          <CardDescription>
            Generate non-medical wellness plans for patients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Wellness Recommendations placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  