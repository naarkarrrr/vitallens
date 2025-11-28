
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { patients } from "@/lib/placeholder-data";
import { sendPatientReminder } from "@/ai/flows/send-patient-reminder";
import { useState } from "react";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PatientNotificationsPage() {
    const [patientId, setPatientId] = useState('');
    const [reminderType, setReminderType] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSendReminder = async () => {
        if (!patientId || !reminderType || !message) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a patient, reminder type, and enter a message.',
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await sendPatientReminder({ patientId, reminderType, message });
            if (result.success) {
                toast({
                    title: 'Reminder Sent!',
                    description: `Successfully sent a ${reminderType} reminder to the patient.`,
                    action: <CheckCircle className="h-5 w-5 text-green-500" />
                });
                // Reset form
                setPatientId('');
                setReminderType('');
                setMessage('');
            } else {
                throw new Error("Failed to send reminder");
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not send the reminder. Please try again.',
            });
        }
        setIsLoading(false);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Notification System</CardTitle>
          <CardDescription>
            Send reminders to patients for follow-ups, medication, appointments, and wellness tips.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select value={patientId} onValueChange={setPatientId}>
                        <SelectTrigger id="patient">
                            <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                            {patients.map(p => <SelectItem key={p.patientId} value={p.patientId}>{p.first_name} {p.last_name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="reminderType">Reminder Type</Label>
                     <Select value={reminderType} onValueChange={setReminderType}>
                        <SelectTrigger id="reminderType">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Appointment">Appointment Reminder</SelectItem>
                            <SelectItem value="Medication">Medication Reminder</SelectItem>
                            <SelectItem value="Follow-up">Follow-up Visit</SelectItem>
                            <SelectItem value="Wellness">Wellness Tip</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                    id="message" 
                    placeholder="e.g., Hi John, this is a reminder for your appointment tomorrow at 10 AM with Dr. Carter."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSendReminder} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Send Notification
                </Button>
            </div>
        </CardContent>
      </Card>
    )
  }
