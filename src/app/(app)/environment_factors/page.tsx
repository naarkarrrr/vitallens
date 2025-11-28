
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

type EnvironmentFactor = {
    id: string;
    date: string;
    festival: string;
    pollution_index: number;
    temperature_C: number;
    rainfall_mm: number;
    disease_alert: string;
    predicted_spike_factor: number;
};

const initialData: EnvironmentFactor[] = [
    { id: '1', date: '2024-07-29', festival: 'None', pollution_index: 150, temperature_C: 32, rainfall_mm: 5, disease_alert: 'High Dengue Risk', predicted_spike_factor: 1.2 },
    { id: '2', date: '2024-07-30', festival: 'None', pollution_index: 155, temperature_C: 33, rainfall_mm: 2, disease_alert: 'High Dengue Risk', predicted_spike_factor: 1.3 },
];

export default function EnvironmentFactorsPage() {
  const [factors, setFactors] = useState<EnvironmentFactor[]>(initialData);
  const [formData, setFormData] = useState<Omit<EnvironmentFactor, 'id'>>({
    date: '',
    festival: '',
    pollution_index: 0,
    temperature_C: 0,
    rainfall_mm: 0,
    disease_alert: '',
    predicted_spike_factor: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? Number(value) : value
    }));
  };

  const handleAddFactor = () => {
    const newFactor: EnvironmentFactor = { ...formData, id: (factors.length + 1).toString() };
    setFactors(prev => [...prev, newFactor]);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Environmental Factors</CardTitle>
          <CardDescription>
            Manage environmental and external factors for disease outbreak forecasting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={formData.date} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="festival">Festival</Label>
                    <Input id="festival" placeholder="e.g., Diwali" value={formData.festival} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="pollution_index">Pollution Index (AQI)</Label>
                    <Input id="pollution_index" type="number" value={formData.pollution_index} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="temperature_C">Temperature (°C)</Label>
                    <Input id="temperature_C" type="number" value={formData.temperature_C} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="rainfall_mm">Rainfall (mm)</Label>
                    <Input id="rainfall_mm" type="number" value={formData.rainfall_mm} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="disease_alert">Disease Alert</Label>
                    <Input id="disease_alert" placeholder="e.g., High Flu Risk" value={formData.disease_alert} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="predicted_spike_factor">Predicted Spike Factor</Label>
                    <Input id="predicted_spike_factor" type="number" step="0.1" value={formData.predicted_spike_factor} onChange={handleInputChange} />
                </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={handleAddFactor}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Factor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Existing Factors</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>AQI</TableHead>
                        <TableHead>Temperature</TableHead>
                        <TableHead>Disease Alert</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {factors.map((factor) => (
                        <TableRow key={factor.id}>
                            <TableCell>{factor.date}</TableCell>
                            <TableCell>{factor.pollution_index}</TableCell>
                            <TableCell>{factor.temperature_C}°C</TableCell>
                            <TableCell>{factor.disease_alert}</TableCell>
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
