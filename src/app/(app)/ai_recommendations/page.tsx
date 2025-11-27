import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecommendationForm } from "./recommendation-form";

export default function AiRecommendationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Clinical Recommendations</CardTitle>
        <CardDescription>
          Enter patient data to generate AI-powered clinical recommendations. This tool is for informational purposes only and does not substitute professional medical advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecommendationForm />
      </CardContent>
    </Card>
  );
}
