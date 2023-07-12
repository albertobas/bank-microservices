export * from './account';
export * from './customer';
export * from './loan';
export * from './request';

export interface InteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: null;
}
