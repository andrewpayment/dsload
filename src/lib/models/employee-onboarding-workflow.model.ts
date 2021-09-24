import { CompanyResource } from './company-resource.model';
import { OnboardingWorkflowTask } from './onboarding-workflow-task.model';

export interface EmployeeOnboardingWorkflow {
  employeeId: number;
  onboardingWorkflowTaskId: number;
  isCompleted: boolean | null;
  isHeader: boolean | null;
  formTypeId: number | null;
  formDefinitionId: number | null;
  modifiedBy: number;
  modified: Date;
  stateId: number | null;
  formDefinition: string;
  resources: CompanyResource[];
  onboardingTask: OnboardingWorkflowTask;
  isDeleted: boolean;
}