// src/app/(app)/ai_decision_engine/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function AiDecisionEnginePage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Decision Engine</CardTitle>
          <CardDescription>
            This module runs a decision analysis based on patient data, using a scoring matrix and rule engine.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>AI Decision Engine placeholder page.</p>
        </CardContent>
      </Card>
    )
  }
  