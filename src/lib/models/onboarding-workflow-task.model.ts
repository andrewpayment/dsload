import { CompanyResource } from './company-resource.model';
import { Resource } from './resource.model';

export interface OnboardingWorkflowTask { 
  onboardingWorkflowTaskId: number;
  mainTaskId: number | null;
  workflowTitle: string;
  linkToState: string;
  route: string;
  route1: string;
  isHeader: boolean | null;
  isRequired: boolean | null;
  sequence: number | null;
  description: string;
  adminDescription: string;
  adminMustSelect: boolean;
  modifiedBy: number;
  modified: Date;
  formDefinitionId: number;
  signatureDescription: string;
  clientId: number | null;
  isReferred: boolean;
  hasActiveWorkflowReference: boolean;
  requireWorkflowTaskId: boolean;
  uploadDescription: string;
  userMustUpload: boolean;
  resources: CompanyResource[];
  userMustUploadResource: Resource;
  isDeleted: boolean;
}