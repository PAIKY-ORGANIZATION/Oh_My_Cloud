
"use client"

import { FormItem, UserForm } from "@/src/components/shared_components/user_form/simple_user_form_element"
import { RegisterUserService } from "@/src/http_services/users/register_user_service"
import { login_path} from "@/src/lib/app_paths"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { validateRegisterUserData } from "@/src/schemas/user_schemas"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toast"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { generate } from "@wcj/generate-password";
import SimpleRegister from "./client_component/elements/simple_register_element"
import ExtendedRegister from "./client_component/elements/extended_register_element"



export default function Register() {

    const router = useRouter()

    async function  generateSafePassword () {
        const password = generate({ length: 24, upperCase: true, lowerCase: true, numeric: true, special: true });
        await navigator.clipboard.writeText(password)
        toast.success("Password copied to clipboard!")
    }


    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.
 
        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirm_password = formData.get('confirm_password') as string

        if (password !== confirm_password) {
            toast.error("Passwords do not match")
            return
        }

        const validationResult = validateRegisterUserData({username, email, password})
         
        if (!validationResult.success){
            toast.error(validationResult.error.issues[0].message)
            return
        }
        
        const registerUserService = new RegisterUserService(remoteAxiosClient)

        try { //! Only for HTTP errors, don't catch other frontend errors here, that gives issues.
            await registerUserService.send(username, email, password)
            
        } catch (e) {
            handleFrontendHttpError(e as Error, router)
            return
        }

        toast.success("User registered successfully")
        router.push(login_path)
    }


    let EMAIL_DEFAULT_VALUE: string = "";
    let PASSWORD_DEFAULT_VALUE: string = "";
    let USERNAME_DEFAULT_VALUE: string = "";
    if(process.env.NODE_ENV === "development"){
        EMAIL_DEFAULT_VALUE = "dev_test@email.com"
        USERNAME_DEFAULT_VALUE = "dev_test_username"
        PASSWORD_DEFAULT_VALUE = "12345678"
    }

    

    return (
        <ExtendedRegister 
            handleSubmit={handleSubmit} 
            USERNAME_DEFAULT_VALUE={USERNAME_DEFAULT_VALUE} 
            EMAIL_DEFAULT_VALUE={EMAIL_DEFAULT_VALUE} 
            PASSWORD_DEFAULT_VALUE={PASSWORD_DEFAULT_VALUE} 
            generateSafePassword={generateSafePassword} 
        />
    )
}