import { Formik, Form, Field, ErrorMessage } from "formik";

const CommanForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    fields,
    buttonText,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Form>
                {fields.map((field) => (
                    <div key={field.name} className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            {field.label}
                        </label>

                        <Field
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />

                        <ErrorMessage
                            name={field.name}
                            component="p"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>
                ))}

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {buttonText}
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default CommanForm
