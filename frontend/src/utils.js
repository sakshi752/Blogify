export const BASE_URL = 'http://localhost:3000/api/v1/';
export const ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT:'/logout',
    USER: "user",
    TODOS: "todos"
}

export const loginFields = [
    {
        name: "identifier",
        label: "Email/Username",
        type: "text",
        placeholder: "Enter email or username"
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password"
    }
]

export const registerFields = [
    {
        name: "fullname",
        label: "Fullname",
        type: "text",
        placeholder: "Enter fullname"
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email"
    },
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter username"
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password"
    },
    {
        name:"avatar",
        label:"Avatar",
        type:"file",
        accept:"image/*"
    }
]