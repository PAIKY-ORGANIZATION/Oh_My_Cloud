
"use client"

import { FormItem, UserForm } from "@/src/shared_components/user_form"
import { LoginUserService } from "@/src/http_services/users/login_user_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { validateLoginUserData } from "@/src/schemas/user_schemas"
import Link from "next/link"
import { toast } from "react-toast"
import { useRouter } from "next/navigation" 
import { register_path } from "@/src/lib/app_paths"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"


export default function Login() {


    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const validationResult = validateLoginUserData({email, password})

        if (!validationResult.success) {
            toast.error(validationResult.error?.issues[0].message)
            return
        }

        
        try{
            const loginUserService = new LoginUserService(remoteAxiosClient)
            await loginUserService.send(email, password)
            
            toast.success("Login successful")
            router.push("/dashboard")
        }catch(e){
            handleFrontendHttpError(e as Error, router)
        }

    }

    let EMAIL_DEFAULT_VALUE: string = "";
    let PASSWORD_DEFAULT_VALUE: string = "";
    if(process.env.NODE_ENV === "development"){
        EMAIL_DEFAULT_VALUE = "dev_test@email.com"
        PASSWORD_DEFAULT_VALUE = "dev_test_password"
    }


    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div className="border border-green-500 p-1">
                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="email" type="email" label="Email" defaultValue={EMAIL_DEFAULT_VALUE}></FormItem>
                    <FormItem name="password" type="password" label="Password" defaultValue={PASSWORD_DEFAULT_VALUE}></FormItem>
                </UserForm>
                <Link href={register_path}>
                    <p> Don&apos;t have an account? <span className="text-blue-500 hover:underline"> Sign up</span> </p>
                </Link>
            </div>
        </div>
    )
}