
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patients } from "@/lib/placeholder-data";
import { generateWellnessPlan, GenerateWellnessPlanOutput } from "@/ai/flows/generate-wellness-plan";
import { useState } from "react";
import { Loader2, Sparkles, AlertTriangle, Leaf } from "lucide-react";

export default function WellnessRecommendationsPage() {
    const [patientId, setPatientId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateWellnessPlanOutput | null>(null);

    const handleGenerate = async () => {
        if (!patientId) return;
        setIsLoading(true);
        setResult(null);
        try {
            const response = await generateWellnessPlan({ patientId });
            setResult(response);
        } catch (error) {
            console.error("Error generating wellness plan:", error);
        }
        setIsLoading(false);
    };

    return (
      <div className="grid gap-6">
        <Card>
            <CardHeader>
            <CardTitle>AI-Powered Wellness Recommendations</CardTitle>
            <CardDescription>
                Generate a non-medical, holistic wellness plan for a patient focusing on diet, lifestyle, and stress management.
            </CardDescription>
            </CardHeader>
             <CardContent className="grid gap-4 md:grid-cols-3">
                 <Select onValueChange={setPatientId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                        {patients.map(p => (
                            <SelectItem key={p.patientId} value={p.patientId}>{p.first_name} {p.last_name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleGenerate} disabled={isLoading || !patientId} className="md:col-span-2">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</> : <><Leaf className="mr-2 h-4 w-4" /> Generate Wellness Plan</>}
                </Button>
            </CardContent>
        </Card>
        
        {result && (
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Personalized Wellness Plan for Patient {patientId}
                    </CardTitle>
                     <div className="flex items-center gap-2 p-2 mt-2 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800">
                        <AlertTriangle className="h-5 w-5"/>
                        <p className="text-sm">This is not medical advice. Consult a doctor for any health concerns.</p>
                    </div>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                   {result.plan.split('\n').map((paragraph, index) => {
                       if (paragraph.startsWith('**')) {
                           return <h4 key={index} className="font-semibold mt-4 mb-2">{paragraph.replace(/\*\*/g, '')}</h4>
                       }
                       if (paragraph.startsWith('* ')) {
                           return <ul key={index} className="list-disc pl-5"><li>{paragraph.substring(2)}</li></ul>
                       }
                       return <p key={index}>{paragraph}</p>
                   })}
                </CardContent>
            </Card>
        )}
      </div>
    )
  }
