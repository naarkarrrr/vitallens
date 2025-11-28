import { config } from 'dotenv';
config();

import '@/ai/flows/generate-clinical-recommendations.ts';
import '@/ai/flows/run-decision-analysis';
import '@/ai/flows/detect-high-risk-patterns';
import '@/ai/flows/auto-generate-encounter-summary';
import '@/ai/flows/check-medicine-stock';
import '@/ai/flows/auto-update-inventory-from-prescription';
import '@/ai/flows/generate-wellness-plan';
import '@/ai/flows/send-patient-reminder';
import '@/ai/flows/log-event';
import '@/ai/flows/system-health-check';
