export interface LoginRequest {
  identificador: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiraEn: string;
  username: string;
  role: 'BOSS' | 'MANAGER';
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  role: 'BOSS' | 'MANAGER';
  mensaje: string;
}
