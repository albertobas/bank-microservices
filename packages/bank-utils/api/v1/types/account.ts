import { type Account } from '../../v1/entities';

export interface AccountInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Account | null;
}

export interface AccountsInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Account[] | null;
}
