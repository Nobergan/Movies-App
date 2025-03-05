export interface AuthErrors {
  errors?: {
    domain: string;
    reason: string;
    message: string;
  }[];
  code: number;
  message: string;
}
