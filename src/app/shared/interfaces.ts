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

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

export interface Email {
  id: string;
  subject: string;
  text: string;
  to: string;
  from: string;
  html: string;
}
