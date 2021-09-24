import { TaxType } from '../enums/tax-type.enum';
import { TaxCategoryType } from '../enums/tax-category.enum';

export interface Tax { 
  taxId: number;
  taxType: TaxType;
  taxCategory: TaxCategoryType;
  stateId: number | null;
  name: string;
  legacyTaxId: number | null;
}