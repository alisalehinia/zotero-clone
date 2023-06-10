import { useFormik } from "formik"
import * as Yup from "yup"
import Head from "next/head"
import Link from "next/link"
import { useAuth, useAuthActions } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CircularIndeterminate from "@/components/circularProgress.js"
import { Box, InputLabel, Typography } from "@mui/material"
import { FormContainer } from "styles/auth"
import { Title } from "styles/body"
import { Input, MyButton } from "styles/input"


const RegisterForm = () => {
    const dispatch = useAuthActions();
    const { user, loading } = useAuth();
    const router = useRouter();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleSubmit = () => {
        dispatch({ type: "SIGNUP", payload: { name: name, email: email, password, password } })

    }
    const formIsValid = () => {
        let valid = true;
        if (password !== confirmPassword) {
            valid = false
        }
        return valid;
    }
    useEffect(() => {
        if (user) router.push("/");
    }, [user])

    if (loading) return <CircularIndeterminate />

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "4px" }}>
            <Head>
                <title>Zotero | signup</title>
            </Head>
            <FormContainer>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <Title variant="h4">Signup page</Title>
                    <InputLabel htmlFor="name" sx={{ fontSize: "16px", margin: "5px" }}>Enter your name</InputLabel >
                    <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                        setName(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <InputLabel htmlFor="email" sx={{ fontSize: "16px", margin: "5px" }}>Enter your email</InputLabel >
                    <Input id="email" label="email" error={false} variant="outlined" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <InputLabel htmlFor="password" sx={{ fontSize: "16px", margin: "5px" }}>Enter your password</InputLabel >
                    <Input label="password" id="password" type="password" error={false} variant="outlined" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <InputLabel htmlFor="confirmPassword" sx={{ fontSize: "16px", margin: "5px" }}>Enter confirm password</InputLabel >
                    <Input label="confirm Password" id="confirmPassword" type="password" error={false} variant="outlined" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <MyButton disabled={!formIsValid} onClick={handleSubmit} variant="contained">Signup</MyButton>
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                    <Typography variant="caption">
                        {" Already Have Account?"}
                    </Typography>
                    <Link href="/login" className="text-blue-500">
                        Login
                    </Link>
                </Box>
            </FormContainer>
        </Box>
    )
}

export default RegisterForm;