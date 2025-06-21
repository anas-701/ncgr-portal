import { SearchModel } from "../../../@models/shared/search-model.model";


export interface GetEvaluationParamsDto extends SearchModel{

}
export interface GetEvaluationListDto {
  id: string;
  titleAr: string;
  titleEn: string;
  trainingServiceNameAr: string;
  trainingServiceNameEn: string;
  relatedCount: number;
  isActive: boolean;
}

export interface CreateUpdateEvaluationDto {
  id?: string;
  titleAr: string;
  titleEn: string;
  trainingServiceId: string;
  isActive: boolean;
}
