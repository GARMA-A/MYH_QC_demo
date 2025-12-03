import { testDefinitions } from './realLabData';

export const categories = [
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'hematology', name: 'Hematology' },
  { id: 'immunology', name: 'Immunology/Hormones' },
];

export const machines = [
  {
    id: 'machine-12',
    name: 'Cobas 6000 c501',
    model: 'Roche c501 Module',
    category: 'chemistry',
    status: 'operational' as const,
    location: 'Chemistry Lab - Section A',
    lastMaintenance: '2025-08-28',
    testsToday: 1247,
    equipmentCode: 12,
    tests: testDefinitions[12] || [],
    lastQC: {
      date: '2025-09-17 08:25',
      status: 'pass' as const,
    },
  },
  {
    id: 'machine-10',
    name: 'Sysmex XN-1000',
    model: 'XN-1000 Hematology Analyzer',
    category: 'hematology',
    status: 'operational' as const,
    location: 'Hematology Lab - Section B',
    lastMaintenance: '2025-08-15',
    testsToday: 892,
    equipmentCode: 10,
    tests: testDefinitions[10] || [],
    lastQC: {
      date: '2025-09-14 09:12',
      status: 'pass' as const,
    },
  },
  {
    id: 'machine-9',
    name: 'Abbott Architect i2000SR',
    model: 'i2000SR Immunoassay Analyzer',
    category: 'immunology',
    status: 'operational' as const,
    location: 'Immunology Lab - Section C',
    lastMaintenance: '2025-09-01',
    testsToday: 634,
    equipmentCode: 9,
    tests: testDefinitions[9] || [],
    lastQC: {
      date: '2025-09-17 08:36',
      status: 'pass' as const,
    },
  },
];

export interface QCHistory {
  id: string;
  machineId: string;
  testName: string;
  testCode: string;
  date: string;
  performedBy: string;
  result: string;
  expectedRange: string;
  status: 'pass' | 'fail';
  notes: string | null;
  qcLevel: string;
  numericResult?: number;
}

// Real QC history from lab data - Machine 12 (Chemistry)
export const qcHistory: QCHistory[] = [
  // QC01 - Normal Level
  {
    id: 'qc-12-001',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-17 08:23',
    performedBy: 'Lab Technician',
    result: '109.1 mg/dL',
    expectedRange: '90-110 mg/dL',
    status: 'pass',
    notes: 'Within acceptable range',
    qcLevel: 'QC01',
    numericResult: 109.1,
  },
  {
    id: 'qc-12-002',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-16 08:22',
    performedBy: 'Lab Technician',
    result: '94.3 mg/dL',
    expectedRange: '90-110 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC01',
    numericResult: 94.3,
  },
  {
    id: 'qc-12-003',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-15 12:09',
    performedBy: 'Lab Technician',
    result: '96.2 mg/dL',
    expectedRange: '90-110 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC01',
    numericResult: 96.2,
  },
  {
    id: 'qc-12-004',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-14 14:19',
    performedBy: 'Lab Technician',
    result: '106.8 mg/dL',
    expectedRange: '90-110 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC01',
    numericResult: 106.8,
  },
  {
    id: 'qc-12-005',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-13 10:28',
    performedBy: 'Lab Technician',
    result: '100.3 mg/dL',
    expectedRange: '90-110 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC01',
    numericResult: 100.3,
  },
  
  // QC02 - Level 1 Control
  {
    id: 'qc-12-006',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-17 08:25',
    performedBy: 'Lab Technician',
    result: '25.0 mg/dL',
    expectedRange: '20-30 mg/dL',
    status: 'pass',
    notes: 'Low level control - acceptable',
    qcLevel: 'QC02',
    numericResult: 25.0,
  },
  {
    id: 'qc-12-007',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-16 08:24',
    performedBy: 'Lab Technician',
    result: '26.1 mg/dL',
    expectedRange: '20-30 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC02',
    numericResult: 26.1,
  },
  {
    id: 'qc-12-008',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-13 10:12',
    performedBy: 'Lab Technician',
    result: '23.3 mg/dL',
    expectedRange: '20-30 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC02',
    numericResult: 23.3,
  },
  {
    id: 'qc-12-009',
    machineId: 'machine-12',
    testName: 'Glucose',
    testCode: '42',
    date: '2025-09-11 10:28',
    performedBy: 'Lab Technician',
    result: '23.4 mg/dL',
    expectedRange: '20-30 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC02',
    numericResult: 23.4,
  },
  
  // QC03 - Level 2 Control
  {
    id: 'qc-12-010',
    machineId: 'machine-12',
    testName: 'BUN (Blood Urea Nitrogen)',
    testCode: '51',
    date: '2025-09-16 08:22',
    performedBy: 'Lab Technician',
    result: '27.8 mg/dL',
    expectedRange: '25-32 mg/dL',
    status: 'pass',
    notes: 'High level control verified',
    qcLevel: 'QC03',
    numericResult: 27.8,
  },
  {
    id: 'qc-12-011',
    machineId: 'machine-12',
    testName: 'BUN (Blood Urea Nitrogen)',
    testCode: '51',
    date: '2025-09-15 12:09',
    performedBy: 'Lab Technician',
    result: '31.0 mg/dL',
    expectedRange: '25-32 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC03',
    numericResult: 31.0,
  },
  {
    id: 'qc-12-012',
    machineId: 'machine-12',
    testName: 'BUN (Blood Urea Nitrogen)',
    testCode: '51',
    date: '2025-09-13 10:10',
    performedBy: 'Lab Technician',
    result: '28.5 mg/dL',
    expectedRange: '25-32 mg/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'QC03',
    numericResult: 28.5,
  },

  // Machine 10 - Hematology XbarM1 Controls
  {
    id: 'qc-10-001',
    machineId: 'machine-10',
    testName: 'White Blood Cell Count',
    testCode: 'WBC',
    date: '2025-09-14 09:12',
    performedBy: 'Lab Technician',
    result: '6.83 x10³/µL',
    expectedRange: '6.5-7.2 x10³/µL',
    status: 'pass',
    notes: 'X-bar Mean Control within target',
    qcLevel: 'XbarM1',
    numericResult: 6.83,
  },
  {
    id: 'qc-10-002',
    machineId: 'machine-10',
    testName: 'Hemoglobin',
    testCode: 'HGB',
    date: '2025-09-14 09:12',
    performedBy: 'Lab Technician',
    result: '13.0 g/dL',
    expectedRange: '12.7-13.0 g/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'XbarM1',
    numericResult: 13.0,
  },
  {
    id: 'qc-10-003',
    machineId: 'machine-10',
    testName: 'Platelet Count',
    testCode: 'PLT-I',
    date: '2025-09-14 09:12',
    performedBy: 'Lab Technician',
    result: '240 x10³/µL',
    expectedRange: '234-244 x10³/µL',
    status: 'pass',
    notes: null,
    qcLevel: 'XbarM1',
    numericResult: 240,
  },
  {
    id: 'qc-10-004',
    machineId: 'machine-10',
    testName: 'White Blood Cell Count',
    testCode: 'WBC',
    date: '2025-09-09 13:37',
    performedBy: 'Lab Technician',
    result: '6.81 x10³/µL',
    expectedRange: '6.5-7.2 x10³/µL',
    status: 'pass',
    notes: null,
    qcLevel: 'XbarM1',
    numericResult: 6.81,
  },
  {
    id: 'qc-10-005',
    machineId: 'machine-10',
    testName: 'Hemoglobin',
    testCode: 'HGB',
    date: '2025-09-09 11:12',
    performedBy: 'Lab Technician',
    result: '12.8 g/dL',
    expectedRange: '12.7-13.0 g/dL',
    status: 'pass',
    notes: null,
    qcLevel: 'XbarM1',
    numericResult: 12.8,
  },

  // Machine 9 - Immunology PC Controls
  {
    id: 'qc-9-001',
    machineId: 'machine-9',
    testName: 'TSH (Thyroid Stimulating Hormone)',
    testCode: '90',
    date: '2025-09-17 08:26',
    performedBy: 'Lab Technician',
    result: '0.026 mIU/L',
    expectedRange: '0.020-0.030 mIU/L',
    status: 'pass',
    notes: 'Process control within limits',
    qcLevel: 'PC',
    numericResult: 0.026,
  },
  {
    id: 'qc-9-002',
    machineId: 'machine-9',
    testName: 'TSH (Thyroid Stimulating Hormone)',
    testCode: '90',
    date: '2025-09-17 08:26',
    performedBy: 'Lab Technician',
    result: '1.68 mIU/L',
    expectedRange: '1.58-1.74 mIU/L',
    status: 'pass',
    notes: null,
    qcLevel: 'PC',
    numericResult: 1.68,
  },
  {
    id: 'qc-9-003',
    machineId: 'machine-9',
    testName: 'Vitamin B12',
    testCode: '227',
    date: '2025-09-17 08:35',
    performedBy: 'Lab Technician',
    result: '133.2 pg/mL',
    expectedRange: '117-146 pg/mL',
    status: 'pass',
    notes: null,
    qcLevel: 'PC',
    numericResult: 133.2,
  },
  {
    id: 'qc-9-004',
    machineId: 'machine-9',
    testName: 'Vitamin B12',
    testCode: '227',
    date: '2025-09-17 08:36',
    performedBy: 'Lab Technician',
    result: '4628 pg/mL',
    expectedRange: '4200-4831 pg/mL',
    status: 'pass',
    notes: 'High level control verified',
    qcLevel: 'PC',
    numericResult: 4628,
  },
  {
    id: 'qc-9-005',
    machineId: 'machine-9',
    testName: 'Folate (Folic Acid)',
    testCode: '171',
    date: '2025-09-17 08:32',
    performedBy: 'Lab Technician',
    result: '0.514 ng/mL',
    expectedRange: '0.472-0.531 ng/mL',
    status: 'pass',
    notes: null,
    qcLevel: 'PC',
    numericResult: 0.514,
  },
  {
    id: 'qc-9-006',
    machineId: 'machine-9',
    testName: 'Folate (Folic Acid)',
    testCode: '171',
    date: '2025-09-17 08:33',
    performedBy: 'Lab Technician',
    result: '9.76 ng/mL',
    expectedRange: '8.88-9.76 ng/mL',
    status: 'pass',
    notes: null,
    qcLevel: 'PC',
    numericResult: 9.76,
  },
  {
    id: 'qc-9-007',
    machineId: 'machine-9',
    testName: 'TSH (Thyroid Stimulating Hormone)',
    testCode: '90',
    date: '2025-09-16 07:53',
    performedBy: 'Lab Technician',
    result: '0.024 mIU/L',
    expectedRange: '0.020-0.030 mIU/L',
    status: 'pass',
    notes: null,
    qcLevel: 'PC',
    numericResult: 0.024,
  },
  {
    id: 'qc-9-008',
    machineId: 'machine-9',
    testName: 'TSH (Thyroid Stimulating Hormone)',
    testCode: '90',
    date: '2025-09-16 07:54',
    performedBy: 'Lab Technician',
    result: '1.67 mIU/L',
    expectedRange: '1.58-1.74 mIU/L',
    status: 'pass',
    notes: null,
    qcLevel: 'PC',
    numericResult: 1.67,
  },
];

// Generate 30 days of QC test data for charts with proper statistical distribution
export function generate30DayData(machineId: string) {
  const machine = machines.find(m => m.id === machineId);
  if (!machine) return [];

  const data = [];
  const today = new Date('2025-09-17');
  
  // Get relevant QC tests for this machine
  const machineTests = qcHistory.filter(qc => qc.machineId === machineId);
  
  // Use a seed for consistent data generation
  let seed = machineId.charCodeAt(0) * 1000;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Find tests for this date
    const dayTests = machineTests.filter(qc => qc.date.startsWith(dateStr));
    
    // If no tests for this date, generate some with normal distribution
    if (dayTests.length === 0 && i < 25) {
      // Generate 1-2 tests per day for recent dates
      const numTests = Math.floor(seededRandom() * 2) + 1;
      const tests = [];
      
      for (let j = 0; j < numTests && j < machine.tests.length; j++) {
        const test = machine.tests[j];
        
        // Calculate expected mean and standard deviation from range
        const midpoint = (test.lowRange + test.highRange) / 2;
        const range = test.highRange - test.lowRange;
        // Assume range represents ±2 SD for most QC materials
        const stdDev = range / 4;
        
        // Box-Muller transform for normal distribution
        const u1 = seededRandom();
        const u2 = seededRandom();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        
        // Generate value with normal distribution
        let value = midpoint + z0 * stdDev;
        
        // Occasionally introduce errors for testing Westgard rules
        const errorChance = seededRandom();
        if (errorChance < 0.02) {
          // 2% chance of 3-sigma violation
          value = midpoint + (seededRandom() < 0.5 ? 3.5 : -3.5) * stdDev;
        } else if (errorChance < 0.05) {
          // 3% chance of 2-sigma violation
          value = midpoint + (seededRandom() < 0.5 ? 2.5 : -2.5) * stdDev;
        }
        
        // Determine status based on value
        const status = (value >= test.lowRange && value <= test.highRange) ? 'pass' : 'fail';
        
        tests.push({
          testName: test.name,
          status: status as 'pass' | 'fail',
          value: parseFloat(value.toFixed(2)),
        });
      }
      
      data.push({
        date: dateStr,
        tests,
      });
    } else if (dayTests.length > 0) {
      // Use actual test data
      data.push({
        date: dateStr,
        tests: dayTests.map(qc => ({
          testName: qc.testName,
          status: qc.status,
          value: qc.numericResult || 0,
        })),
      });
    }
  }
  
  return data;
}
