'use client';

import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { generateClinicalRecommendations } from '@/ai/flows/generate-clinical-recommendations';
import { Loader2, Sparkles } from 'lucide-react';
import { GenerateClinicalRecommendationsOutput } from '@/ai/flows/generate-clinical-recommendations';

const formSchema = z.object({
  patientMedicalHistory: z.string().min(10, 'Please provide more details.'),
  patientVitals: z.string().min(10, 'Please provide more details.'),
  patientDiagnoses: z.string().min(10, 'Please provide more details.'),
  patientLabResults: z.string().min(10, 'Please provide more details.'),
});

type FormValues = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [result, setResult] = useState<GenerateClinicalRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientMedicalHistory: '',
      patientVitals: '',
      patientDiagnoses: '',
      patientLabResults: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateClinicalRecommendations(values);
      setResult(response);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      setResult({ recommendations: 'An error occurred while generating recommendations. Please try again.' });
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="patientMedicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Medical History</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 45-year-old male with a history of hypertension, diagnosed 5 years ago..." {...field} rows={5}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientVitals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Vitals</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., BP 140/90 mmHg, HR 88 bpm, Temp 37.0°C..." {...field} rows={5}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientDiagnoses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Diagnoses</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Provisional Diagnosis: Community-acquired pneumonia. Final: Confirmed via chest X-ray. ICD-10: J18.9" {...field} rows={5}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientLabResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Lab Results</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., CBC: WBC 12.5 x 10^9/L (High), Hgb 14 g/dL. CRP: 50 mg/L (High)." {...field} rows={5}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Recommendations'
            )}
          </Button>
        </form>
      </Form>
      {result && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Generated Clinical Recommendations
            </h3>
            <div className="prose prose-sm max-w-none text-foreground">
              <p>{result.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
