export const BASE_URL = 'http://localhost:3000/api/v1/';
export const ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: '/logout',
    USER: "user",
    TODOS: "todos",
    CHANGE_PASSWORD: "/change-password",
    UPDATE_AVATAR: "/update-avatar",
    UPDATE_USER: "/update-user",
    BLOGS:"blogs"
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
        type: "email",
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
        name: "avatar",
        label: "Avatar",
        type: "file",
        accept: "image/*"
    }
]

export const updateUserFields = [
    {
        name: "fullname",
        label: "Fullname",
        type: "text",
        placeholder: "Enter fullname"
    },
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter Username"
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email"
    },
    {
        name: "bio",
        label: "Bio",
        type: "text",
        placeholder: "Enter bio"
    }
]

export const updatePwFields = [
    {
        name: "oldPw",
        label: "Old Password",
        type: "password",
        placeholder: "Enter Old password"
    },
    {
        name: "newPw",
        label: "New Password",
        type: "password",
        placeholder: "Enter New password"
    }
]

import { FaBlog, FaHome, FaSave, FaUserEdit } from "react-icons/fa";
import { RiBookMarkedFill, RiLockPasswordLine, RiProfileFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";

export const sideBarItems = [
    {
        pageTitle: "Home",
        icon: FaHome,
        path: "/dashboard"
    },
    {
        pageTitle: "Profile",
        icon: RiProfileFill,
        path: "/:username"
    },
    {
        pageTitle: "Stories",
        icon: FaBlog,
        path: "/me/blogs"
    },
    {
        pageTitle: "bookmarks",
        icon: RiBookMarkedFill,
        path: "/me/bookmarks"
    },
 
];

export const settingOptions = [
      {
        pageTitle: "Update Details",
        icon: FaUserEdit,
        path: "/settings/update-user"
    },
      {
        pageTitle: "Update Password",
        icon: RiLockPasswordLine,
        path: "/settings/update-password"
    },
]