export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LogInMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  token: string;
  displayName: string;
  avatar: File | null;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
  };
  name: string;
  message: string;
}

export interface GlobalError {
  error: string;
}

export interface Photo{
  _id: string;
  user: User;
  title: string;
  image: string;
}

export interface PhotoModal {
  _id: string;
  user: User;
  title: string;
  image: File | null;
}