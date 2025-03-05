export interface CurrentUser {
  idToken?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: number;
  localId?: string;
  displayName?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  phoneNumber?: number | null;
  photoUrl?: string;
  providerId?: string;
  tenantId?: string | null;
}
