import { useFormik } from "formik"
import * as Yup from "yup"
import Head from "next/head"
import Input from "@/components/FormInput/index"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth, useAuthActions } from "@/context/AuthContext"
import { useEffect } from "react"
import CircularIndeterminate from "@/components/circularProgress.js"

const initialValues = {
    email: "",
    password: ""
}
const validationSchema = Yup.object({
    email: Yup.string().required("Enter your Email").email("Invalid Email"),
    password: Yup.string().required("Enter Password").min(8, "must be at least 8 characters")
})
const RegisterForm = () => {
    const router = useRouter();
    const dispatch = useAuthActions();
    const { user, loading } = useAuth();
    const onSubmit = (values) => {
        const { email, password } = values
        dispatch({ type: "SIGNIN", payload: values })
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    })

    useEffect(() => {
        if (user) {
            console.log(user);
            router.push("/");
        }
    }, [user])

    if (loading) return <CircularIndeterminate />

    return <>
        <Head>
            <title>Zotero | login</title>
        </Head>
        <div className="md:max-w-md px-4 container mx-auto mb-4">
            <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
                <h1 className="font-black text-2xl text-blue-700 mb-4">Sign in</h1>
                <Input label="Email" name="email" type="text" formik={formik} className={""} />
                <Input label="Password" name="password" type="password" formik={formik} />
                <button
                    type="submit"
                    // disabled={!formik.isValid}
                    className="w-full py-2 rounded-lg bg-blue-700 text-white"
                >Sign in</button>
                <Link href="/signup">
                    <p className="mt-4 py-4 cursor-pointer"> Dont Have account ? Sign Un</p>
                </Link>
            </form>

        </div>
    </>

}

export default RegisterForm;