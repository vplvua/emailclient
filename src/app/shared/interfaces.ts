export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

export interface SignupResponse {
  username: string;
}

export interface SigninResponse {
  authenticated: boolean;
  username: string;
}
