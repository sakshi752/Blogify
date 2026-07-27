import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from "formik";

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
            {({ setFieldValue }) => (
                <Form>
                    {fields.map((field) => (
                        <div key={field.name} className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                {field.label}
                            </label>

                            {field.type === "file" ? (
                                <input
                                    type="file"
                                    name={field.name}
                                    onChange={(event) => {
                                        setFieldValue(
                                            field.name,
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                    className="w-full"
                                />
                            ) : (
                                <Field
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                />
                            )}

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
            )}
        </Formik>
    );
};

export default CommanForm;