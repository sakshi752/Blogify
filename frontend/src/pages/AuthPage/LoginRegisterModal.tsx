export interface RegisterRequest {
    username: string,
    email: string,
    fullname: string,
    password: string,
    avatar: File
}

export interface LoginRequest {
    identifier: string,
    password: string
}