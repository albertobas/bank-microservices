import { type Request } from '../../v1/entities/request';

export interface RequestInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Request | null;
}

export interface RequestsInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Request[] | null;
}
