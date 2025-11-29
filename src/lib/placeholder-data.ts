import type { Patient, Encounter, Vitals, Diagnosis, Lab, Prescription, Bed, Staff, Equipment, InventoryItem, InventoryOrder } from './types';

export const patients: Patient[] = [
  {
    patientId: 'PAT001',
    first_name: 'John',
    last_name: 'Doe',
    dob: '1985-02-15',
    age: 39,
    gender: 'Male',
    phone: '555-0101',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    emergency_contact: { name: 'Jane Doe', phone: '555-0102', relationship: 'Wife' },
    allergies: ['Peanuts'],
    chronic_conditions: ['Hypertension'],
  },
  {
    patientId: 'PAT002',
    first_name: 'Jane',
    last_name: 'Smith',
    dob: '1992-08-22',
    age: 31,
    gender: 'Female',
    phone: '555-0103',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Anytown, USA',
    emergency_contact: { name: 'Jim Smith', phone: '555-0104', relationship: 'Husband' },
    allergies: [],
    chronic_conditions: ['Asthma'],
  },
];

export const encounters: Encounter[] = [
  {
    encounterId: 'ENC001',
    patient_id: 'PAT001',
    doctor_id: 'DOC001',
    department: 'Cardiology',
    encounter_type: 'OPD',
    date_time_in: '2024-07-29T10:00:00Z',
    date_time_out: '2024-07-29T10:45:00Z',
    reason_for_visit: 'Routine check-up',
  },
  {
    encounterId: 'ENC002',
    patient_id: 'PAT002',
    doctor_id: 'DOC002',
    department: 'Emergency',
    encounter_type: 'ER',
    date_time_in: '2024-07-28T15:30:00Z',
    date_time_out: null,
    reason_for_visit: 'Asthma attack',
  },
];

export const vitals: Vitals[] = [
  {
    vitalsId: 'VIT001',
    encounter_id: 'ENC001',
    temperature: 36.8,
    heart_rate: 72,
    systolic_bp: 130,
    diastolic_bp: 85,
    respiratory_rate: 16,
    oxygen_saturation: 98,
    weight: 85,
  },
];

export const diagnoses: Diagnosis[] = [
  {
    diagnosisId: 'DIA001',
    encounter_id: 'ENC001',
    symptoms: 'None',
    provisional_diagnosis: 'Stable Hypertension',
    final_diagnosis: 'Essential (primary) hypertension',
    icd10_code: 'I10',
  },
];

export const labs: Lab[] = [
  {
    labId: 'LAB001',
    encounter_id: 'ENC001',
    test_name: 'Lipid Panel',
    test_category: 'Cardiology',
    result_value: '150',
    result_unit: 'mg/dL',
    reference_range: '<200',
    flag: 'Normal',
  },
];

export const prescriptions: Prescription[] = [
  {
    prescriptionId: 'PRE001',
    encounter_id: 'ENC001',
    drug_name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once a day',
    duration: '30 days',
    route: 'Oral',
  },
];

export const beds: Bed[] = [
  { bedId: 'B-101', ward: 'Cardiology', bed_type: 'Standard', status: 'Occupied', patient_id: 'PAT001', admitted_at: '2024-07-29T11:00:00Z', discharged_at: null },
  { bedId: 'B-102', ward: 'Cardiology', bed_type: 'Standard', status: 'Available', patient_id: null, admitted_at: null, discharged_at: null },
  { bedId: 'ICU-01', ward: 'ICU', bed_type: 'ICU', status: 'Available', patient_id: null, admitted_at: null, discharged_at: null },
  { bedId: 'ICU-02', ward: 'ICU', bed_type: 'ICU', status: 'Cleaning', patient_id: null, admitted_at: null, discharged_at: null },
];

export const staff: Staff[] = [
  { staffId: 'STF001', name: 'Dr. Emily Carter', role: 'Doctor', specialization: 'Cardiology', shift_start: '08:00', shift_end: '16:00', duty_status: 'On Duty' },
  { staffId: 'STF002', name: 'Nurse Michael Chen', role: 'Nurse', shift_start: '07:00', shift_end: '19:00', duty_status: 'On Duty' },
  { staffId: 'STF003', name: 'Dr. Sarah Lee', role: 'Doctor', specialization: 'Pediatrics', shift_start: '09:00', shift_end: '17:00', duty_status: 'Off Duty' },
];

export const equipment: Equipment[] = [
  { equipmentId: 'EQP001', name: 'ECG Machine', status: 'Available', last_serviced: '2024-06-01', usage_count: 120 },
  { equipmentId: 'EQP002', name: 'Ventilator', status: 'In Use', last_serviced: '2024-05-15', usage_count: 45 },
];

export const inventory: InventoryItem[] = [
  { itemId: 'INV001', item_name: 'Aspirin 81mg', quantity_available: 5000, reorder_level: 1000, supplier_id: 'SUP01', min_required: 500, lead_time_days: 7 },
  { itemId: 'INV002', item_name: 'Sterile Gauze', quantity_available: 800, reorder_level: 1000, supplier_id: 'SUP02', min_required: 200, lead_time_days: 5 },
  { itemId: 'INV003', item_name: 'Amoxicillin 500mg', quantity_available: 1200, reorder_level: 500, supplier_id: 'SUP01', min_required: 200, lead_time_days: 3 },
  { itemId: 'INV004', item_name: 'Ibuprofen 200mg', quantity_available: 300, reorder_level: 1000, supplier_id: 'SUP02', min_required: 400, lead_time_days: 5 },
];

export const inventoryOrders: InventoryOrder[] = [
    {
      orderId: 'ORD001',
      item_name: 'Ibuprofen 200mg',
      quantity_ordered: 2000,
      order_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      expected_delivery_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      current_stage: 'Dispatched',
      stages_list: ["Order Placed", "Supplier Processing", "Dispatched", "In Transit", "Arriving Soon", "Delivered"],
      status: 'in-progress'
    },
    {
      orderId: 'ORD002',
      item_name: 'Sterile Gauze',
      quantity_ordered: 500,
      order_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      expected_delivery_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // yesterday
      current_stage: 'Delivered',
      stages_list: ["Order Placed", "Supplier Processing", "Dispatched", "In Transit", "Arriving Soon", "Delivered"],
      status: 'delivered'
    }
];
