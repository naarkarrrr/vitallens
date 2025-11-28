
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

type AdmissionMetric = {
  id: string;
  admission_id: string;
  patient_id: string;
  admission_date: string;
  discharge_date: string;
  diagnosis: string;
  ward_type: string;
  ICU_required: boolean;
  LOS_days: number;
  oxygen_liters_used: number;
  medication_units_used: number;
};

const initialData: AdmissionMetric[] = [
    { id: '1', admission_id: 'ADM001', patient_id: 'PAT001', admission_date: '2024-07-01', discharge_date: '2024-07-05', diagnosis: 'Pneumonia', ward_type: 'General', ICU_required: false, LOS_days: 4, oxygen_liters_used: 50, medication_units_used: 120 },
    { id: '2', admission_id: 'ADM002', patient_id: 'PAT002', admission_date: '2024-07-02', discharge_date: '2024-07-10', diagnosis: 'Myocardial Infarction', ward_type: 'ICU', ICU_required: true, LOS_days: 8, oxygen_liters_used: 250, medication_units_used: 300 },
];


export default function AdmissionMetricsPage() {
  const [metrics, setMetrics] = useState<AdmissionMetric[]>(initialData);
  const [formData, setFormData] = useState<Omit<AdmissionMetric, 'id'>>({
    admission_id: '',
    patient_id: '',
    admission_date: '',
    discharge_date: '',
    diagnosis: '',
    ward_type: '',
    ICU_required: false,
    LOS_days: 0,
    oxygen_liters_used: 0,
    medication_units_used: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleAddMetric = () => {
    // In a real app, this would interact with a backend/DB.
    const newMetric: AdmissionMetric = { ...formData, id: (metrics.length + 1).toString() };
    setMetrics(prev => [...prev, newMetric]);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Admission Metrics</CardTitle>
          <CardDescription>
            Manage admission metrics for AI forecasting and operational analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="admission_id">Admission ID</Label>
                    <Input id="admission_id" value={formData.admission_id} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="patient_id">Patient ID</Label>
                    <Input id="patient_id" value={formData.patient_id} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="admission_date">Admission Date</Label>
                    <Input id="admission_date" type="date" value={formData.admission_date} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="discharge_date">Discharge Date</Label>
                    <Input id="discharge_date" type="date" value={formData.discharge_date} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input id="diagnosis" value={formData.diagnosis} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="ward_type">Ward Type</Label>
                    <Input id="ward_type" value={formData.ward_type} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="LOS_days">LOS (Days)</Label>
                    <Input id="LOS_days" type="number" value={formData.LOS_days} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="oxygen_liters_used">O2 Used (Liters)</Label>
                    <Input id="oxygen_liters_used" type="number" value={formData.oxygen_liters_used} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="medication_units_used">Medication Used (Units)</Label>
                    <Input id="medication_units_used" type="number" value={formData.medication_units_used} onChange={handleInputChange} />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                    <Checkbox id="ICU_required" checked={formData.ICU_required} onCheckedChange={(checked) => setFormData(prev => ({...prev, ICU_required: !!checked}))} />
                    <Label htmlFor="ICU_required">ICU Required</Label>
                </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={handleAddMetric}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Metric
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Existing Metrics</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Admission ID</TableHead>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>LOS</TableHead>
                        <TableHead>ICU</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {metrics.map((metric) => (
                        <TableRow key={metric.id}>
                            <TableCell>{metric.admission_id}</TableCell>
                            <TableCell>{metric.patient_id}</TableCell>
                            <TableCell>{metric.diagnosis}</TableCell>
                            <TableCell>{metric.LOS_days}</TableCell>
                            <TableCell>{metric.ICU_required ? 'Yes' : 'No'}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                                <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
