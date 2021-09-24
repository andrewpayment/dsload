
export interface EmployeeClientRate {
  employeeClientRateId: number;
  employeeId: number;
  clientId: number;
  clientRateId: number;
  rate: number;
  isDefaultRate: boolean;
  rateEffectiveDate: Date | null;
  notes: string;
}
