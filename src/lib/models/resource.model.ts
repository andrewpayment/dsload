import { ResourceSourceType } from '../enums/resource-source-type.enum';

export interface Resource { 
  resourceId: number;
  clientId: number | null;
  employeeId: number | null;
  userId: number | null;
  name: string;
  sourceTypeId: ResourceSourceType;
  source: string;
  addedDate: Date;
  isDeleted: boolean;
  modifiedBy: number;
  modified: Date;
  addedBy: number | null;
}