'use server';

/**
 * @fileOverview Generates clinical recommendations based on patient data.
 *
 * - generateClinicalRecommendations - A function that generates clinical recommendations.
 * - GenerateClinicalRecommendationsInput - The input type for the generateClinicalRecommendations function.
 * - GenerateClinicalRecommendationsOutput - The return type for the generateClinicalRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateClinicalRecommendationsInputSchema = z.object({
  patientMedicalHistory: z
    .string()
    .describe("The patient's medical history, including chronic conditions, allergies, and past surgeries."),
  patientVitals: z.string().describe("The patient's vital signs, including temperature, heart rate, blood pressure, respiratory rate, and oxygen saturation."),
  patientDiagnoses: z.string().describe("The patient's diagnoses, including symptoms, provisional diagnosis, final diagnosis, and ICD10 code."),
  patientLabResults: z.string().describe("The patient's lab results, including test name, test category, result value, result unit, and reference range."),
});
export type GenerateClinicalRecommendationsInput = z.infer<typeof GenerateClinicalRecommendationsInputSchema>;

const GenerateClinicalRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('Clinical recommendations based on the provided patient data.'),
});
export type GenerateClinicalRecommendationsOutput = z.infer<typeof GenerateClinicalRecommendationsOutputSchema>;

export async function generateClinicalRecommendations(
  input: GenerateClinicalRecommendationsInput
): Promise<GenerateClinicalRecommendationsOutput> {
  return generateClinicalRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateClinicalRecommendationsPrompt',
  input: {schema: GenerateClinicalRecommendationsInputSchema},
  output: {schema: GenerateClinicalRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides clinical recommendations for doctors.

  Based on the patient's medical history, vitals, diagnoses, and lab results, provide clinical recommendations.

  Patient Medical History: {{{patientMedicalHistory}}}
  Patient Vitals: {{{patientVitals}}}
  Patient Diagnoses: {{{patientDiagnoses}}}
  Patient Lab Results: {{{patientLabResults}}}

  Recommendations:`,
});

const generateClinicalRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateClinicalRecommendationsFlow',
    inputSchema: GenerateClinicalRecommendationsInputSchema,
    outputSchema: GenerateClinicalRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
