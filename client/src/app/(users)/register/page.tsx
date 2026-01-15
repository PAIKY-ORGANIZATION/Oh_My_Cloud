
"use client"

import { FormItem, UserForm } from "@/src/context/user_form"
import { RegisterUserService } from "@/src/http_services/users/create"
import { unexpected_error_path } from "@/src/lib/app_paths"
import { AppError, toAppError } from "@/src/lib/http/app_error"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { validateUser } from "@/src/schemas/user_schemas"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toast"
// import toast from "react-toast"



export default function Register() {

    const router = useRouter()


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.
 
        //? Validate form data with Zod
        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const registerData = {username, email, password}

        console.log(registerData)

        const result = validateUser(registerData)
         
        if(!result.success){
            toast.error(result.error.issues[0].message)
            return
        }
        
        try {
            const registerUserService = new RegisterUserService(remoteAxiosClient)
            const result =  await registerUserService.send(username, email, password)
            toast.success("User registered successfully")
            router.push("/login")

        } catch (e) {

            console.log(e)
            const err: AppError = toAppError(e as Error)
            if(err.kind == "unknown" || err.kind == "network"){
                router.push(unexpected_error_path + "/" + err.message)
                return
            }
            toast.error(err.message)
        }
    }

    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div className="border border-green-500 p-1">
                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="username" type="text" label="Username"></FormItem>
                    <FormItem name="email" type="email" label="Email"></FormItem>
                    <FormItem name="password" type="password" label="Password"></FormItem>
                </UserForm>
                <Link href="/login">
                    <p> Already have an account? <span className="text-blue-500 hover:underline"> Login</span> </p>
                </Link>
            </div>
        </div>
    )
}