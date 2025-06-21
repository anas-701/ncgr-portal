
export interface LoginDto {
  userName: string;
  password: string;
}

export interface GetUserLoginDto {
  id: string;
  shortNameAr: string;
  shortNameEn: string;
  gender?: number;
  currentRole?: string;
  currentRoleNameAr?: string;
  currentRoleNameEn?: string;
  roleCount: number;
  token: string;
}

export interface GetCurrentRoleListDto {
  id: string;
  roleId: string;
  nameAr: string;
  nameEn: string;
}

export interface GetCurrentRoleDetailsDto {
  shortNameAr: string;
  shortNameEn: string;
  gender?: number;
  currentRole?: string;
  currentRoleNameAr?: string;
  currentRoleNameEn?: string;
  roleCount: number;
}