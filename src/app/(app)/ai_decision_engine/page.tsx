
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patients } from "@/lib/placeholder-data";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { runDecisionAnalysis, RunDecisionAnalysisOutput } from "@/ai/flows/run-decision-analysis";
import { Progress } from "@/components/ui/progress";

export default function AiDecisionEnginePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RunDecisionAnalysisOutput | null>(null);
    const [patientId, setPatientId] = useState<string | null>(null);

    const handleAnalysis = async () => {
        if (!patientId) return;
        setIsLoading(true);
        setResult(null);
        try {
            const response = await runDecisionAnalysis({ patientId });
            setResult(response);
        } catch (error) {
            console.error("Error running decision analysis:", error);
        }
        setIsLoading(false);
    };

    const getScoreColor = (score: number) => {
        if (score > 75) return "text-red-600";
        if (score > 50) return "text-yellow-600";
        return "text-green-600";
    };

    return (
      <div className="grid gap-6">
        <Card>
            <CardHeader>
            <CardTitle>AI Decision Engine</CardTitle>
            <CardDescription>
                Run a decision analysis for a patient based on a weighted scoring matrix and rule engine to assess clinical risk.
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
                <Button onClick={handleAnalysis} disabled={isLoading || !patientId} className="md:col-span-2">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Run Clinical Risk Analysis"}
                </Button>
            </CardContent>
        </Card>

        {result && (
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                             <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Analysis Result for Patient {patientId}
                            </CardTitle>
                            <CardDescription>Overall Risk Score: <span className={`font-bold ${getScoreColor(result.overallScore)}`}>{result.overallScore.toFixed(2)}</span></CardDescription>
                        </div>
                        <div className={`flex items-center gap-2 p-2 rounded-md ${getScoreColor(result.overallScore).replace('text-', 'bg-').replace('-600', '-100')} border ${getScoreColor(result.overallScore).replace('text-', 'border-').replace('-600', '-300')}`}>
                            <AlertTriangle className="h-5 w-5" />
                            <span className="font-semibold">{result.riskLevel}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">Factor Analysis</h4>
                        <div className="grid gap-4">
                            {result.factors.map(factor => (
                                <div key={factor.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">{factor.name} (Weight: {factor.weight})</span>
                                        <span className={`text-sm font-bold ${getScoreColor(factor.score)}`}>{factor.score.toFixed(2)} / 100</span>
                                    </div>
                                    <Progress value={factor.score} />
                                    <p className="text-xs text-muted-foreground mt-1">{factor.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Recommendations</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            {result.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    )
  }
