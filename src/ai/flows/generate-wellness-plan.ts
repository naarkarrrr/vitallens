'use server';
/**
 * @fileOverview AI flow for generating a wellness plan.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateWellnessPlanInputSchema = z.object({
    patientId: z.string(),
});
export type GenerateWellnessPlanInput = z.infer<typeof GenerateWellnessPlanInputSchema>;

export const GenerateWellnessPlanOutputSchema = z.object({
    plan: z.string(),
});
export type GenerateWellnessPlanOutput = z.infer<typeof GenerateWellnessPlanOutputSchema>;

export async function generateWellnessPlan(input: GenerateWellnessPlanInput): Promise<GenerateWellnessPlanOutput> {
  // Placeholder implementation
  console.log('Generating wellness plan for patient:', input.patientId);
  return { plan: 'Drink more water and get 8 hours of sleep.' };
}
