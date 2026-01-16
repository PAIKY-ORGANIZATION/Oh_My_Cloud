
"use client"

import { FormItem, UserForm } from "@/src/shared_components/user_form"
import { RegisterUserService } from "@/src/http_services/users/register_user_service"
import { login_path} from "@/src/lib/app_paths"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { validateRegisterUserData } from "@/src/schemas/user_schemas"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toast"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
// import toast from "react-toast"



export default function Register() {

    const router = useRouter()


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.
 
        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const validationResult = validateRegisterUserData({username, email, password})
         
        if (!validationResult.success){
            toast.error(validationResult.error.issues[0].message)
            return
        }
        
        try {
            const registerUserService = new RegisterUserService(remoteAxiosClient)
            await registerUserService.send(username, email, password)
            toast.success("User registered successfully")
            router.push(login_path)

        } catch (e) {
            handleFrontendHttpError(e as Error, router)
        }
    }


    let EMAIL_DEFAULT_VALUE: string = "";
    let PASSWORD_DEFAULT_VALUE: string = "";
    let USERNAME_DEFAULT_VALUE: string = "";
    if(process.env.NODE_ENV === "development"){
        EMAIL_DEFAULT_VALUE = "dev_test@email.com"
        PASSWORD_DEFAULT_VALUE = "dev_test_password"
        USERNAME_DEFAULT_VALUE = "dev_test_username"
    }

    

    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div className="border border-green-500 p-1">
                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="username" type="text" label="Username" defaultValue={USERNAME_DEFAULT_VALUE}></FormItem>
                    <FormItem name="email" type="email" label="Email" defaultValue={EMAIL_DEFAULT_VALUE}></FormItem>
                    <FormItem name="password" type="password" label="Password" defaultValue={PASSWORD_DEFAULT_VALUE}></FormItem>
                </UserForm>
                <Link href={login_path}>
                    <p> Already have an account? <span className="text-blue-500 hover:underline"> Login</span> </p>
                </Link>
            </div>
        </div>
    )
}