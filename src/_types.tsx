// Файл для хранения глобмальных типов используемых во всем проекте

export interface AuthData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshTokenExpiresIn: number;
    myProperty: unknown;
}
