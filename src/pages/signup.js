import { useFormik } from "formik"
import * as Yup from "yup"
import Head from "next/head"
import Input from "@/components/FormInput/index"
import Link from "next/link"
import { useAuth, useAuthActions } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"
import CircularIndeterminate from "@/components/circularProgress.js"

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const validationSchema = Yup.object({
    name: Yup.string().required("Enter firstName and lastName").min(6, "must be at least 6 characters "),
    email: Yup.string().required("Enter Email").email("invalid Email"),
    password: Yup.string().required("Enter Password").min(8, "must be at least 8 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), ""], "must be same as Entered password").required("Enter Confirmation password")
})
const RegisterForm = () => {
    const dispatch = useAuthActions();
    const { user, loading } = useAuth();
    const router = useRouter();
    const onSubmit = (values) => {
        const { name, email, password } = values;
        const values2 = { name, email, password }
        dispatch({ type: "SIGNUP", payload: values2 })

    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,

    })
    useEffect(() => {
        if (user) router.push("/");
    }, [user])

    if (loading) return <CircularIndeterminate />

    return <>
        <Head>
            <title>Zotero | Signup</title>
        </Head>
        <div className="md:max-w-md  px-4 container mx-auto">
            <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
                <h1 className="font-black text-2xl text-blue-500 mb-4">Sign up</h1>
                <Input label="fullName" name="name" type="text" formik={formik} />
                <Input label="Email" name="email" type="text" formik={formik} />
                <Input label="Password" name="password" type="password" formik={formik} />
                <Input label="Confirm Password" name="confirmPassword" type="password" formik={formik} />

                <button
                    type="submit"
                    // disabled={!formik.isValid}
                    className="w-full py-2 rounded-lg bg-blue-700 text-white"
                >Sign up</button>
                <Link href="/login">
                    <p className="mt-4 py-4 cursor-pointer">َAlready sign up? login</p>
                </Link>
            </form>

        </div>
    </>

}

export default RegisterForm;