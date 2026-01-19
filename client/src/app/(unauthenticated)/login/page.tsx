
"use client"

import { LoginUserService } from "@/src/http_services/users/login_user_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { validateLoginUserData } from "@/src/schemas/user_schemas"
import { toast } from "react-toast"
import { useRouter } from "next/navigation" 
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { useAuthContext } from "@/src/components/context/auth_content_provider"
import SimpleLogin from "./client_component/elements/simple_login_element"

export default function Login() {

    const router = useRouter()
    const {setUserSession} = useAuthContext()

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
            const userSession = await loginUserService.send(email, password)
            setUserSession(userSession)
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
        PASSWORD_DEFAULT_VALUE = "12345678"
    }

    return (
        <SimpleLogin handleSubmit={handleSubmit} EMAIL_DEFAULT_VALUE={EMAIL_DEFAULT_VALUE} PASSWORD_DEFAULT_VALUE={PASSWORD_DEFAULT_VALUE} />
    )

}