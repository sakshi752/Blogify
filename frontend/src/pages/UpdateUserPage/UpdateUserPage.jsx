import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup"
import CommanForm from '../../Components/CommanForm/CommanForm';
import { updateUserFields } from '../../utils';

const UpdateUserPage = () => {
  const { user, token } = useSelector(
    (state) => state.auth
  );
  console.log("user ", user)
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
  const onSubmit = async (values)=>{

  }
  return (

    <div className='max-w-7xl mx-auto bg-blue-400/30 backdrop-blur-md rounded-2xl shadow-lg p-8'>
      <div className="text-3xl font-bold mb-8 text-center">
        <h1>Update your profile</h1>
      </div>


      <div className='grid grid-cols-1 lg:grid-cols-3'>
        {/* left */}
        <div className='flex flex-col'>
          <div>
            <img src={user.avatar} alt={user.fullname} className='w-32 h-32 rounded object-cover' loading='eager' />
          </div>
          <label className="mt-6 cursor-pointer">

            <span className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Change Photo
            </span>

            <input
              type="file"
              className="hidden"
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
             buttons={[
            {
              text: "Update",
              type: "submit",
              className:
                "w-[20%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold",
              onClick:onSubmit
            },
            {
              text: "Cancel",
              type: "button",
              onClick: () => console.log("cancel clicked"),
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

export default UpdateUserPage
