export interface UsersFiled{
    email: string;
    password: string;
    role: string;
    token: string;
    displayName: string;
    googleId: string;
    avatar: File | null;
}