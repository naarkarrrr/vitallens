export type Patient = {
  patientId: string;
  first_name: string;
  last_name: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  };
  allergies: string[];
  chronic_conditions: string[];
};

export type Encounter = {
  encounterId: string;
  patient_id: string;
  doctor_id: string;
  department: string;
  encounter_type: 'OPD' | 'IPD' | 'ER';
  date_time_in: string;
  date_time_out: string | null;
  reason_for_visit: string;
};

export type Vitals = {
  vitalsId: string;
  encounter_id: string;
  temperature: number;
  heart_rate: number;
  systolic_bp: number;
  diastolic_bp: number;
  respiratory_rate: number;
  oxygen_saturation: number;
  weight: number;
};

export type Diagnosis = {
  diagnosisId: string;
  encounter_id: string;
  symptoms: string;
  provisional_diagnosis: string;
  final_diagnosis: string;
  icd10_code: string;
};

export type Lab = {
  labId: string;
  encounter_id: string;
  test_name: string;
  test_category: string;
  result_value: string;
  result_unit: string;
  reference_range: string;
  flag: 'Normal' | 'Abnormal' | 'Critical';
};

export type Prescription = {
  prescriptionId: string;
  encounter_id: string;
  drug_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
};

export type Bed = {
  bedId: string;
  ward: string;
  bed_type: 'Standard' | 'ICU' | 'Pediatric';
  status: 'Available' | 'Occupied' | 'Cleaning';
  patient_id: string | null;
  admitted_at: string | null;
  discharged_at: string | null;
};

export type Staff = {
  staffId: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Lab Technician' | 'Pharmacist' | 'Admin' | 'Staff';
  specialization?: string;
  shift_start: string;
  shift_end: string;
  duty_status: 'On Duty' | 'Off Duty' | 'On Leave';
};

export type Equipment = {
  equipmentId: string;
  name: string;
  status: 'Available' | 'In Use' | 'Under Maintenance';
  last_serviced: string;
  usage_count: number;
};

export type InventoryItem = {
  itemId: string;
  item_name: string;
  quantity_available: number;
  reorder_level: number;
  supplier_id: string;
  min_required: number;
  lead_time_days: number;
};

export type InventoryOrder = {
  orderId: string;
  item_name: string;
  quantity_ordered: number;
  order_date: string;
  expected_delivery_time: string;
  current_stage: string;
  stages_list: string[];
  status: 'pending' | 'in-progress' | 'delivered';
};
