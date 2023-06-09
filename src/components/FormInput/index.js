const Input = ({ label, formik, name, type, className, placeholder = "" }) => {
    return (
        <div className={className}>
            <label className="flex flex-row mb-2 text-sm text-gray-500" htmlFor={name}>
                {label}

                {formik.touched[name] && formik.errors[name] ? (
                    <div className="flex-1 ml-2 text-rose-500 text-left text-xs">
                        {formik.errors[name]}
                    </div>
                ) : null}
            </label>
            <input
                type={type || "text"}
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.HandleBlur}
                dir="ltr"
                placeholder={placeholder}
                className="text-left border p-2 text-sm rounded border-gray-200 outline-none
               w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

            />

        </div>
    )
}
export default Input