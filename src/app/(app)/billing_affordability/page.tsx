
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { DollarSign, Percent, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function BillingAffordabilityPage() {
    const [cost, setCost] = useState(50000);
    const [insurance, setInsurance] = useState(70);
    const [subsidy, setSubsidy] = useState(5000);
    const [affordability, setAffordability] = useState<{score: number, patientShare: number} | null>(null);

    const calculateAffordability = () => {
        const insuredAmount = cost * (insurance / 100);
        const patientShare = cost - insuredAmount - subsidy;
        
        // Simple scoring logic: lower share = higher score. Capped at 100.
        // This is a placeholder for a more complex financial model.
        let score = 100 - (patientShare / (cost * 0.5)) * 100;
        score = Math.max(0, Math.min(score, 100));
        
        setAffordability({ score, patientShare });
    };

    const getScoreColor = (score: number) => {
        if (score < 40) return "bg-red-500";
        if (score < 75) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
            <CardTitle>Affordable Care Calculator</CardTitle>
            <CardDescription>
                Estimate treatment costs, apply insurance and subsidies, and generate an affordability score for the patient.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
                <div className="grid gap-2">
                    <Label htmlFor="cost">Estimated Treatment Cost (₹)</Label>
                    <Input id="cost" type="number" value={cost} onChange={e => setCost(Number(e.target.value))} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="insurance">Insurance Coverage (%)</Label>
                     <div className="flex items-center gap-4">
                        <Slider id="insurance" value={[insurance]} onValueChange={([val]) => setInsurance(val)} max={100} step={1} />
                        <span className="font-bold w-16 text-right">{insurance}%</span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="subsidy">Government/Hospital Subsidy (₹)</Label>
                    <Input id="subsidy" type="number" value={subsidy} onChange={e => setSubsidy(Number(e.target.value))} />
                </div>
                <Button onClick={calculateAffordability}>Calculate Affordability</Button>
            </CardContent>
        </Card>
        
        {affordability !== null && (
             <Card>
                <CardHeader>
                    <CardTitle>Affordability Analysis</CardTitle>
                    <CardDescription>Based on the provided inputs.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Affordability Score</p>
                        <p className="text-6xl font-bold" style={{color: getScoreColor(affordability.score).replace('bg-', 'text-')}}>{affordability.score.toFixed(0)}</p>
                        <Progress value={affordability.score} className={`h-3 mt-2 ${getScoreColor(affordability.score)}`} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Cost</p>
                            <p className="text-xl font-bold">₹{cost.toLocaleString()}</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Patient's Share</p>
                            <p className="text-xl font-bold">₹{affordability.patientShare.toLocaleString()}</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                           <DollarSign className="h-8 w-8 text-red-500"/>
                           <div>
                                <CardTitle>Patient Responsibility</CardTitle>
                                <CardDescription>₹{affordability.patientShare.toLocaleString()}</CardDescription>
                           </div>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                           <ShieldCheck className="h-8 w-8 text-green-500"/>
                           <div>
                                <CardTitle>Total Coverage</CardTitle>
                                <CardDescription>₹{(cost - affordability.patientShare).toLocaleString()}</CardDescription>
                           </div>
                        </CardHeader>
                    </Card>

                </CardContent>
            </Card>
        )}
      </div>
    )
  }
