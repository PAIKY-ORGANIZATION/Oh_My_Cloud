"use client"

import { useState } from "react"
import { deleteUserCookies } from "../../../actions/delete_user_cookies"
import { useRouter } from "next/navigation"
import { login_path } from "../../../lib/app_paths"
import { DeleteAccountService } from "../../../http_services/users/delete_account_service"
import { remoteAxiosClient } from "../../../lib/http/remote_http_client"
import { handleFrontendHttpError } from "../../../utils/handle_frontend_error"
import { useAuthContext } from "../../context/auth_content_provider"
import NavbarExtended from "./jsx/navbar_extended_jsx"
import NavbarSimple from "./jsx/navbar_simple_jsx"

export default function  Navbar() {


    const {userSession, setUserSession} = useAuthContext()
    const [writePasswordModalOpen, setWritePasswordModalOpen] = useState<boolean>(false)
    const router = useRouter()
    const [password, setPassword] = useState<string>("")

    
    const [userOptionsOpen, setUserOptionsOpen] = useState<boolean>(false)

    async function logout () {

        await deleteUserCookies()
        setUserOptionsOpen(false)
        setUserSession(null)
        router.push(login_path)
    }


    async function deleteAccount (password: string) {
        try{
            const deleteAccountService = new DeleteAccountService(remoteAxiosClient)
            await deleteAccountService.send(password)

            await deleteUserCookies()
            setUserSession(null)
            setWritePasswordModalOpen(false)
            router.push(login_path)
        }catch(e){
            handleFrontendHttpError(e as Error, router)
        }        
    }

    const userName = userSession?.user_name || null

    return (
        <NavbarExtended
            userSession={userSession}
            userName={userName}
            userOptionsOpen={userOptionsOpen}
            setUserOptionsOpen={setUserOptionsOpen}
            writePasswordModalOpen={writePasswordModalOpen}
            setWritePasswordModalOpen={setWritePasswordModalOpen}
            password={password}
            setPassword={setPassword}
            logout={logout}
            deleteAccount={deleteAccount}
        />
    )
    
}