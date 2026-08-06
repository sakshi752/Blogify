import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useMatch, NavLink, useLocation, useNavigate } from "react-router-dom"
import { loginFields, registerFields } from '../../utils'
import CommanForm from '../../Components/CommanForm/CommanForm'
import { toast } from "react-toastify"
import { loginUserService, registerUserService } from './LoginRegisterApiService'
import { useDispatch } from 'react-redux'


const LoginRegisterPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [initialValues, setInitialValues] = useState(
    isLogin
      ? {
        identifier: "",
        password: "",
      }
      : {
        email: "",
        username: "",
        password: "",
        fullname: "",
        avatar: null,
      }
  );
  const [validationSchema, setValidationSchema] = useState(
    isLogin ? Yup.object({
      identifier: Yup.string().required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    }) : Yup.object({
      fullname: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    })
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    try {
      if (isLogin) {
        const requestBody = {
          identifier: values.identifier,
          password: values.password
        }
        loginUserService(requestBody, dispatch, navigate)
      } else {
        const formData = new FormData();

        formData.append("email", values.email);
        formData.append("username", values.username);
        formData.append("password", values.password);
        formData.append("fullname", values.fullname);

        formData.append("avatar", values.avatar);
        registerUserService(formData, dispatch, navigate)
      }

    } catch (error) {
      toast.error(error)
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isLogin ? "Welcome Back 👋" : "Create Account"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Login to continue"
              : "Join us by creating a new account"}
          </p>
        </div>

        {/* Form */}
        <CommanForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          fields={isLogin ? loginFields : registerFields}
          buttonText={isLogin ? "Login" : "Register"}
          inputContainerClassName="mb-5 text-gray-700"
          inputClassName="w-full p-2 bg-gray-300/50 rounded outline-none"
          buttonClassName="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          labelClassName="block mb-2 text-sm font-medium text-gray-700"
          buttons={
            [
              {
              text: `${isLogin ? "Login" : "Register"}`,
              type: "submit",
              className:
                "w-[20%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            }
            ]
          }
        />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <NavLink
                to="/register"
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <NavLink
                to="/login"
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </NavLink>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginRegisterPage
