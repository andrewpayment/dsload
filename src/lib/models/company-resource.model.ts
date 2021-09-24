import { CompanyResourceSecurityLevelType } from '../enums/company-resource-security-level.enum';
import { ResourceSourceType } from '../enums/resource-source-type.enum';

export interface CompanyResource {
  clientId: number | null;
  companyResourceFolderId: number;
  resourceId: number;
  resourceName: string;
  resourceFormat: string;
  securityLevel: CompanyResourceSecurityLevelType;
  resourceTypeId: number;
  isManagerLink: boolean;
  modified: Date;
  modifiedBy: number;
  doesFileExist: boolean | null;
  isAzure: boolean | null;
  azureAccount: number | null;
  cssClass: string;
  source: string;
  currentSource: string;
  isNew: boolean;
  isSelectedResource: boolean;
  previewResourceCssClass: boolean;
  addedDate: Date;
  addedBy: number;
  isDeleted: boolean;
  isFileReselected: boolean;
}