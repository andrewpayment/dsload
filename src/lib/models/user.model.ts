import { UserType } from '../enums/user-type.enum';
import { UserBetaFeature } from './beta-feature.model';

export interface User { 
  userName: string; 
  password?: string; 
  firstName: string; 
  middleInitial: string;
  lastName: string;
  userId: number;
  authUserId: number;
  employeId: number;
  clientId: number;
  clientName: string;
  clientCode: string;
  userTypeId: UserType;
  lastEmployeeId: number;
  lastEmployeeFirstName: string;
  lastEmployeeMiddleInitial: string;
  lastEmployeeLastName: string;
  lastClientId: number;
  lastClientName: string;
  lastClientCode: string;
  emailAddress: string;
  timeoutMinutes: number | null;
  isInOnboarding: boolean;
  certifyI9: boolean;
  addEmployee: boolean;
  isBillingAdmin: boolean;
  isEmployeeSelfServiceViewOnly: boolean;
  isArAdmin: boolean;
  isPayrollAccessBlocked: boolean;
  betaFeatures: UserBetaFeature[];
}
