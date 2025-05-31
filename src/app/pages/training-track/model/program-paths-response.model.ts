export interface ProgramPathsFilter {
  statusId: number;
  searchText?: string;
}

export interface OrderByValue {
  colId: string;
  sort: 1 | 2; // 1 = ascending, 2 = descending
}

export interface ProgramPathsRequest {
  pageNumber: number;
  pageSize: number;
  filter: ProgramPathsFilter;
  orderByValue?: OrderByValue[];
}

export interface ProgramPath {
  id: number;
  titleAr: string;
  titleEn: string;
  isArabic: boolean;
  isEnglish: boolean;
  statusId: number;
  statusName: string;
  trainingProgramsCount: number;
  generalProgramsCount: number;
}

export interface ProgramPathsResponse {
  code: number;
  data: {
    pageNumber: number;
    pageSize: number;
    result: ProgramPath[];
    totalCount: number;
    totalCountNew: number;
  };
}
