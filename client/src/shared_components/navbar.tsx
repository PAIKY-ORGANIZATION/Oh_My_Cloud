"use client"

import { useState } from "react"
import { deleteUserCookies } from "../actions/delete_user_cookies"
import { useRouter } from "next/navigation"
import { login_path } from "../lib/app_paths"
import { DeleteAccountService } from "../http_services/users/delete_account_service"
import { remoteAxiosClient } from "../lib/http/remote_http_client"
import { handleFrontendHttpError } from "../utils/handle_frontend_error"

export default function  Navbar() {

    const router = useRouter()

    const [userOptionsOpen, setUserOptionsOpen] = useState<boolean>(false)

    async function logout () {

        await deleteUserCookies()
        setUserOptionsOpen(false)
        router.push(login_path)
    }


    async function deleteAccount () {
        try{
            const deleteAccountService = new DeleteAccountService(remoteAxiosClient)
            await deleteAccountService.send()

            await deleteUserCookies()
            router.push(login_path)
        }catch(e){
            handleFrontendHttpError(e as Error, router)
        }        
    }

    const userName = "John Doe"

    return (
        <div className="bg-[#000000] flex w-full justify-between px-40 h-10 items-center">
            <div> OhMyCloud </div>
            <div className="relative">
                <button className="flex cursor-pointer" onClick={()=>{setUserOptionsOpen(!userOptionsOpen)}}> {userName} </button>
                {userOptionsOpen && (
                    <div className="absolute w-40 bg-[#474747] p-2">
                        <button className="cursor-pointer hover:bg-[#373737] p-1" onClick={()=>{logout()}}> Logout </button>
                        <button className="cursor-pointer hover:bg-[#373737] p-1" onClick={()=>{deleteAccount()}}> Delete account </button>
                    </div>
                )}
            </div>
            
        </div>
    )
}