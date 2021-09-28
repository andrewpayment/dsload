import { PunchOptionType } from '../enums/punch-option-type.enum';

export interface CheckPunchTypeResult { 
  lastPunchTime: Date | null;
  isFirstPunchOfDay: boolean;
  isOutPunch: boolean;
  shouldDisablePunchTypeSelection: boolean;
  shouldHideCostCenter: boolean;
  shouldHideDepartment: boolean;
  shouldHideJobCosting: boolean;
  shouldHideEmployeeNotes: boolean;
  isCostCenterSelectionRequired: boolean;
  costCenterId: number | null;
  lastOutCostCenterId: number | null;
  lunchCostCenterId: number | null;
  departmentId: number | null;
  divisionId: number | null;
  punchTypeId: number | null;
  punchOption: PunchOptionType | null;
  allowInputPunches: boolean;
  homeCostCenterId: number | null;
  homeDepartmentId: number | null;
  clientJobCostingAssignmentId1: number | null;
  clientJobCostingAssignmentId2: number | null;
  clientJobCostingAssignmentId3: number | null;
  clientJobCostingAssignmentId4: number | null;
  clientJobCostingAssignmentId5: number | null;
  clientJobCostingAssignmentId6: number | null;
  payPeriodEnded: ClockEmployeePayPeriodEnded;
  ipAddress: string;
  canPunchFromIp: boolean | null;
  hasMobilePunching: boolean;
  employeeClockConfiguration: EmployeeClockConfiguration;
}

export interface EmployeeClockConfiguration {
  clientId: number;
  employeeId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  homeDivisionId: number | null;
  homeDepartmentId: number | null;
  homeCostCenterId: number | null;
  clockEmployee: EmployeeClockSetupConfiguration;
}

export interface EmployeeClockSetupConfiguration { 
  badgeNumber: string;
  timePolicy: EmployeeTimePolicyConfiguration;
  punches: EmployeeRecentPunchInfo[];
}

export interface EmployeeRecentPunchInfo {
  clockEmployeePunchId: number;
  modifiedPunch: Date;
  rawPunch: Date;
  shiftDate: Date | null;
  clientCostCenterId: number | null;
  clientDepartmentId: number | null;
  clientDivisionId: number | null;
  clockClientLunchId: number | null;
  transferOption: number | null;
  clientJobCostingAssignmentId1: number | null;
  clientJobCostingAssignmentId2: number | null;
  clientJobCostingAssignmentId3: number | null;
  clientJobCostingAssignmentId4: number | null;
  clientJobCostingAssignmentId5: number | null;
  clientJobCostingAssignmentId6: number | null;
}

export interface EmployeeTimePolicyConfiguration { 
  clockClientTimePolicyId: number;
  name: string;
  rules: EmployeeTimePolicyRuleConfiguration;
  lunches: EmployeeTimePolicyLunchConfiguration[];
}

export interface EmployeeTimePolicyLunchConfiguration {
  clockClientLunchId: number;
  name: string;
  clientCostCenterId: number | null;
  startTime: Date | null;
  stopTime: Date | null;
  isSunday: boolean;
  isMonday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  isThursday: boolean;
  isFriday: boolean;
  isSaturday: boolean;
}

export interface EmployeeTimePolicyRuleConfiguration { 
  clockClientRulesId: number;
  name: string;
  punchOption: PunchOptionType | null;
  maxShift: number | null;
  applyHoursOption: number;
  allowInputPunches: boolean;
  allowMobilePunching: boolean;
  isHideCostCenter: boolean;
  isHideDepartment: boolean;
  isHideEmployeeNotes: boolean;
  isHideJobCosting: boolean;
  isHidePunchType: boolean;
  isHideShift: boolean;
  startDayOfWeek: number | null;
  inEarlyGraceTime: number;
  outLateGraceTime: number;
}

export interface ClockEmployeePayPeriodEnded {
  employeeId: number | null;
  periodEnded: Date | null;
  periodStartLocked: Date | null;
  warningMessageLocked: string;
  warningMessageClosed: string;
  allowScheduleEdits: boolean;
}
