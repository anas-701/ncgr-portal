export interface OrderByValue {
  colId: string;
  sort: 1 | 2;
}

export interface TrainingProgramFilter {
  programName?: string;
  statusId: number;
  languageId: number;
  isActive?: boolean,
  isNotActive?: boolean,
  isArabic?: boolean,
  isEnglish?: boolean,
  categoryId: number;
  pathId: number;
  tageId: number;
  countTrainer: number;
  evaluationId: number;
}

export interface GetAllProgramsRequest {
  pageNumber: number;
  pageSize: number;
  filter?: TrainingProgramFilter;
  orderByValue?: OrderByValue[];
}
export interface GetAllProgramsResponse {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  aboutAr: string;
  aboutEn: string;
  language: number;
  pathId: number;
  pathName: string;
  coverPicturePath: string;
  programPicturePath: string;
  coverPictureName: string;
  programPictureName: string;
  tagsId: number;
  tagsName: string | null;
  typeId: number;
  typeName: string;
  categoryId: number;
  categoryName: string;
  programRequirementsAr: string;
  programRequirementsEn: string;
  privateProgram: boolean;
  programCostId: number;
  programCostName: string;
  certificateId: number;
  certificateName: string;
  programStatusId: number;
  programStatusName: string;
  approvedDate: string;
  createdDate: string;
  approver: string;
  creator: string;
  participants: number;
  rate: string;
  postType: string;
  postDate: string;
  id: number;
}
export interface Lecture {
  id: number;
  titleAr: string;
  titleEn: string;
  typeId: number;
  videoFile?: string;
  youTubeLink?: string;
  contentDetails?: string;
  pdfFile?: string;
  soundFile?: string;
  image?: string;
}

export interface ProgramDepartment {
  id: number;
  trainingProgramId: number;
  titleAr: string;
  titleEn: string;
  lectures: Lecture[];
}

export interface TrainingProgram {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  aboutAr: string;
  aboutEn: string;
  programRequirementsAr: string;
  programRequirementsEn: string;
  coverPicturePath: string;
  programPicturePath: string;
  id: number;
}
