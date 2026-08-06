import React, { useState } from 'react'
import CommanForm from '../../Components/CommanForm/CommanForm'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup"
import { updatePwFields } from '../../utils';
import { toast } from 'react-toastify';
import { changePwService } from './SettingService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [initialValues, setInitialValues] = useState({
    oldPw: "",
    newPw: ""
  })
  const [validationSchema, setValidationSchema] = useState(Yup.object({
    oldPw: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    newPw: Yup.string().min(6, "Password must be at least 6 characters").required("Required")
  }))
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values, { resetForm }) => {
    try {
      const requestBody = {
        oldPassword: values.oldPw,
        newPassword: values.newPw
      }

      await changePwService(requestBody, dispatch, navigate, token)

      resetForm({
        values: {
          oldPw: "",
          newPw: "",
        },
      });
    } catch (error) {
      toast.error(error)
    }
  }

  const onCancel = (resetForm) => {
    toast.success("Form is reset")
    resetForm({
      values: {
        fullname: user.fullname,
        bio: user.bio,
        email: user.email,
        username: user.username,
      },
    });
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className=' bg-blue-400/30 backdrop-blur-md rounded-2xl shadow-lg p-8'>

        <div className="text-3xl font-bold mb-8 text-center">
          <h1>Change Password</h1>
        </div>

        <div>
          <CommanForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            fields={updatePwFields}
            formClassName="space-y-6"
            labelClassName="block mb-2 text-lg font-medium text-white"
            inputClassName="w-[50%] p-2 bg-gray-300/50 text-white rounded outline-none"
            buttons={[
              {
                text: "Update",
                type: "submit",
                className:
                  "w-[20%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold",
              },
              {
                text: "Cancel",
                type: "button",
                onClick: onCancel,
                className:
                  "w-[20%] bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
              }
            ]}
          />
        </div>
      </div>
    </div>

  )
}

export default ChangePasswordPage
