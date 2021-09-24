

export interface UserBetaFeature { 
  userBetaFeatureId: number;
  userId: number;
  betaFeatureId: number;
  isBetaActive: boolean;
  modified?: Date;
  modifiedBy?: number;
  betaFeature: BetaFeature;
}

export interface BetaFeature { 
  betaFeatureId: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  modified?: Date;
  modifiedBy?: number;
  deletedAt?: Date | null;
}
