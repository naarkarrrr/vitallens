
'use server';
/**
 * @fileOverview AI flow for sending a patient reminder.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { patients } from '@/lib/placeholder-data';

export const SendPatientReminderInputSchema = z.object({
    patientId: z.string(),
    reminderType: z.string(),
    message: z.string(),
});
export type SendPatientReminderInput = z.infer<typeof SendPatientReminderInputSchema>;

export const SendPatientReminderOutputSchema = z.object({
    success: z.boolean(),
});
export type SendPatientReminderOutput = z.infer<typeof SendPatientReminderOutputSchema>;

export async function sendPatientReminder(input: SendPatientReminderInput): Promise<SendPatientReminderOutput> {
  const patient = patients.find(p => p.patientId === input.patientId);
  if (!patient) {
      console.error(`Patient not found: ${input.patientId}`);
      return { success: false };
  }
  
  // Placeholder implementation: logs to console instead of sending email/SMS
  console.log(`
    ========================================
    SENDING PATIENT NOTIFICATION
    ----------------------------------------
    To: ${patient.first_name} ${patient.last_name} (${patient.email})
    Type: ${input.reminderType}
    Message: ${input.message}
    ========================================
  `);

  // In a real app, you would integrate with an email/SMS service like Twilio or SendGrid.
  // For example: await sendEmail(patient.email, `A new ${input.reminderType} from VitalLens Ai`, input.message);
  
  // Simulate a successful API call
  return { success: true };
}
