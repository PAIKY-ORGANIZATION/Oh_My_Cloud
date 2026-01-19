"use client"
import Link from "next/link"
import { login_path } from "@/src/lib/app_paths"


import { ServerResponseAuthCheck } from "@/src/http_services/users/auth_check_service"
import { Dispatch, SetStateAction } from "react"

export type NavbarProps = {
    userSession: ServerResponseAuthCheck | null
    userName: string | null
    userOptionsOpen: boolean
    setUserOptionsOpen: Dispatch<SetStateAction<boolean>>
    writePasswordModalOpen: boolean
    setWritePasswordModalOpen: Dispatch<SetStateAction<boolean>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    logout: () => Promise<void>
    deleteAccount: (password: string) => Promise<void>
}





export default function  NavbarSimple({
    userSession,
    userName,
    userOptionsOpen,
    setUserOptionsOpen,
    logout,
    setWritePasswordModalOpen,
    password,
    setPassword,
    deleteAccount,
    writePasswordModalOpen,
}: NavbarProps) {

    return (
        <div className="bg-[#000000] flex w-full justify-between px-40 h-10 items-center">
            <div> OhMyCloud </div>
            <div className="relative">
                {userSession ? (
                    <>
                        <button className="flex cursor-pointer" onClick={()=>{setUserOptionsOpen(!userOptionsOpen)}}> {userName} </button>
                        {userOptionsOpen && (
                            <div className="absolute w-40 bg-[#474747] p-2">
                                <button className="cursor-pointer hover:bg-[#373737] p-1" onClick={()=>{logout()}}> Logout </button>
                                <button className="cursor-pointer hover:bg-[#373737] p-1" onClick={()=>{setWritePasswordModalOpen(true)}}> Delete account </button>
                            </div>
                        )}
                    </>
                    ): 
                    <Link href={login_path}> Login </Link>
                }
            </div>
            
            {writePasswordModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
                    <div className="bg-[#131313] border border-[#202020] rounded  flex flex-col w-[90vw] max-w-[420px] min-h-[300px] p-2">
                        <p>Write your password to delete your account</p>
                        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <button 
                            className="bg-red-500 px-1 hover:bg-red-400 cursor-pointer"
                            onClick={()=>{deleteAccount(password)}}
                        >
                            Delete account
                        </button>
                        <button className="bg-blue-500 px-1 hover:bg-blue-400 cursor-pointer" onClick={()=>{setWritePasswordModalOpen(false)}}> Cancel </button>
                    </div>
                </div>
            )}
        </div>
    )
}