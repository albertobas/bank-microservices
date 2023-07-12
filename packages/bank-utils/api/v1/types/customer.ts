import { type Customer } from '../../v1/entities';

export interface CustomerInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Customer | null;
}

export interface CustomersInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Customer[] | null;
}
