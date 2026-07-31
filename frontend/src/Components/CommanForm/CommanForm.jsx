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
    buttons = [],
    formClassName = "",
    inputContainerClassName = "",
    inputClassName = "",
    labelClassName = "",

}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ setFieldValue, resetForm }) => (
                <Form className={formClassName}>

                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className={inputContainerClassName}
                        >
                            <label className={labelClassName}>
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
                                    className={inputClassName}
                                />
                            ) : (
                                <Field
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    className={inputClassName}
                                />
                            )}

                            <ErrorMessage
                                name={field.name}
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                    ))}


                    <div className="flex gap-4">
                        {buttons.map((button) => (
                            <button
                                key={button.text}
                                type={button.type || "button"}
                                className={button.className}
                                //    onClick={button.type !== "submit" ? button.onClick : undefined}
                                onClick={() => button.onClick?.(resetForm)}
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default CommanForm;