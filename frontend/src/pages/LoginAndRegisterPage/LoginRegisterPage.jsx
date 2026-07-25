import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useMatch, NavLink } from "react-router-dom"
import { loginFields, registerFields } from '../../utils'
import CommanForm from '../../Components/CommanForm/CommanForm'
import {toast} from "react-toastify"


const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(useMatch("/login"))

  const [intialValues, setInitialValues] = useState({})
  const [validationSchema, setValidationSchema] = useState({})

  useEffect(() => {
    if (isLogin) {

      setInitialValues({
        identifier: "",
        password: ""
      })

      setValidationSchema(
        Yup.object({
          identifier: Yup.string().required("Required"),
          password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        }))

    } else {
      setInitialValues({
        email: "",
        username: "",
        password: "",
        fullname: "",
        avatar: null
      })

      setValidationSchema(Yup.object({
        fullname: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().email().required("Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      }))
    }
  }, [isLogin])

  const onSubmit =async (values) => {
    try {
      const requrestBody ={

      }
      co
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
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          fields={isLogin ? loginFields : registerFields}
          buttonText={isLogin ? "Login" : "Register"}
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
