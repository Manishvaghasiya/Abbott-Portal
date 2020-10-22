export interface LoginModel {
    password: string;
    username: string;
    rememberMe?: boolean;
}

export interface FinishPasswordModel {
    key: string;
    newPassword: string;
}
