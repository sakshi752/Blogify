import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup"
import CommanForm from '../../Components/CommanForm/CommanForm';
import { updateUserFields } from '../../utils';
import { updateAvatarService, updateUserDetails } from './SettingService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const UpdateUserPage = () => {
  const { user, token } = useSelector(
    (state) => state.auth
  );
  // console.log("user ", user)
  const [initialValues, setInitialValues] = useState({
    fullname: user.fullname,
    bio: user.bio,
    email: user.email,
    username: user.username,
  })
  const [validationSchema, setValidationSchema] = useState(Yup.object({
    fullname: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
  }))
  useEffect(() => {
    setInitialValues({
      fullname: user.fullname,
      bio: user.bio,
      email: user.email,
      username: user.username,
    });
  }, [user]);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onAvatarChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    await updateAvatarService(formData, dispatch, navigate, token);

  }

  const onSubmit = async (values, { resetForm }) => {
    const requestBody = {}

    Object.keys(values).forEach(key => {
      if (values[key] !== user[key]) {
        requestBody[key] = values[key];
      }
    })

    if (Object.keys(requestBody).length === 0) {
      toast.error("Nothing is changed")
    } else {
      const success = await updateUserDetails(
        requestBody,
        dispatch,
        navigate,
        token
      );

      if (!success) {
        resetForm({
          values: {
            fullname: user.fullname,
            bio: user.bio,
            email: user.email,
            username: user.username,
          },
        });
      }
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
          <h1>Update your profile</h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3'>
          {/* left */}
          <div className='flex flex-col'>
            <div>
              <img src={user.avatar.url} alt={user.fullname} className='w-40 h-40 rounded object-cover' loading='eager' />
            </div>
            <label className="mt-6 cursor-pointer">

              <span className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Change Photo
              </span>

              <input
                type="file"
                className="hidden"
                onChange={(event) => onAvatarChange(event)}
              />

            </label>

          </div>
          {/* right */}
          <div className='lg:col-span-2'>
            <CommanForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              fields={updateUserFields}
              formClassName="space-y-6"
              labelClassName="block mb-2 text-lg font-medium text-white"
              inputClassName="w-[70%] p-2 bg-gray-300/50 text-white rounded outline-none"
              buttons={[
                {
                  text: "Update",
                  type: "submit",
                  className:
                    "w-[20%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer",
                },
                {
                  text: "Cancel",
                  type: "button",
                  onClick: onCancel,
                  className:
                    "w-[20%] bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold cursor-pointer"
                }
              ]}
            />
          </div>
        </div>

      </div>
    </div>

  )
}

export default UpdateUserPage
