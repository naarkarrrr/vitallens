
'use server';
/**
 * @fileOverview AI flow for running decision analysis.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const RunDecisionAnalysisInputSchema = z.object({
    patientId: z.string(),
});
export type RunDecisionAnalysisInput = z.infer<typeof RunDecisionAnalysisInputSchema>;

export const RunDecisionAnalysisOutputSchema = z.object({
    overallScore: z.number(),
    riskLevel: z.enum(['Low', 'Moderate', 'High', 'Critical']),
    factors: z.array(z.object({
        name: z.string(),
        score: z.number(),
        weight: z.number(),
        reason: z.string(),
    })),
    recommendations: z.array(z.string()),
});
export type RunDecisionAnalysisOutput = z.infer<typeof RunDecisionAnalysisOutputSchema>;

// This is a placeholder/mock implementation.
// In a real application, this would fetch real patient data from a database.
const mockPatientData: Record<string, any> = {
    'PAT001': { vitals: { heart_rate: 95, systolic_bp: 145 }, age: 39, conditions: ['Hypertension'] },
    'PAT002': { vitals: { heart_rate: 80, systolic_bp: 120 }, age: 31, conditions: ['Asthma'] },
};

export async function runDecisionAnalysis(input: RunDecisionAnalysisInput): Promise<RunDecisionAnalysisOutput> {
    console.log('Running decision analysis for:', input);
    const patientData = mockPatientData[input.patientId] || mockPatientData['PAT002'];

    // Simulate checking for external factors like a festival
    const isFestivalPeriod = true; // In a real app, this would be determined by date
    const festivalFactor = { 
        name: 'Festival Surge Risk', 
        weight: 0.15, 
        score: isFestivalPeriod ? 70 : 0, 
        reason: isFestivalPeriod ? 'Increased admissions expected due to Diwali festival.' : 'No active festival surge.' 
    };

    // Define a simple scoring matrix and rule engine
    const factors = [
        { name: 'Age Risk', weight: 0.2, score: patientData.age > 60 ? 80 : (patientData.age > 40 ? 50 : 20), reason: `Patient age is ${patientData.age}.` },
        { name: 'Blood Pressure Risk', weight: 0.3, score: patientData.vitals.systolic_bp > 140 ? 90 : (patientData.vitals.systolic_bp > 130 ? 60 : 25), reason: `Systolic BP is ${patientData.vitals.systolic_bp} mmHg.` },
        { name: 'Heart Rate Risk', weight: 0.15, score: patientData.vitals.heart_rate > 100 ? 85 : (patientData.vitals.heart_rate > 90 ? 55 : 20), reason: `Heart rate is ${patientData.vitals.heart_rate} bpm.` },
        { name: 'Chronic Condition Risk', weight: 0.2, score: patientData.conditions.includes('Hypertension') ? 75 : (patientData.conditions.length > 0 ? 50 : 10), reason: `${patientData.conditions.length} chronic conditions noted.` },
        festivalFactor,
    ];

    const totalWeight = factors.reduce((acc, factor) => acc + factor.weight, 0);
    const overallScore = factors.reduce((acc, factor) => acc + (factor.score * (factor.weight / totalWeight)), 0);

    let riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
    if (overallScore > 75) riskLevel = 'Critical';
    else if (overallScore > 60) riskLevel = 'High';
    else if (overallScore > 40) riskLevel = 'Moderate';

    const recommendations = [
        'Monitor vitals every 4 hours.',
        'Consider cardiology consultation if BP remains elevated.',
        'Review current medication for effectiveness.',
    ];
    if (riskLevel === 'High' || riskLevel === 'Critical') {
        recommendations.unshift('Immediate physician review required.');
    }
    if(isFestivalPeriod){
        recommendations.push('Consider prioritizing for bed allocation due to festival surge.')
    }

    return {
        overallScore,
        riskLevel,
        factors,
        recommendations,
    };
}
