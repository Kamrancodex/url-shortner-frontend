export interface ShortLinkUnreistered {
  shortUrl: string;
  qrCode: string;
}

export interface CreateLinkRequest {
  link: string;
}
export interface SignupData {
  email: string;
  password: string;
}

export interface SignupResponse {
  token: string;
  user: {
    email: string;
  };
}

export interface SigninResponse {
  token: string;
  user: {
    email: string;
  };
}

export interface RegisteredLink {
  _id: string;
  user: string;
  longUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt: string;
}

export interface CreateRegisteredLinkRequest {
  link: string;
}

export interface CreateRegisteredLinkResponse {
  shortUrl: string;
  shortCode: string;
  longUrl: string;
  visitCount: number;
  createdAt: string;
  _id: string;
  user: string;
}
