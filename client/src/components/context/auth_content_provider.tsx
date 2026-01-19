"use client"
import { AuthCheckService, ServerResponseAuthCheck } from "@/src/http_services/users/auth_check_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"



type AuthContextType = {
    userSession: ServerResponseAuthCheck | null
    setUserSession: Dispatch<SetStateAction<ServerResponseAuthCheck | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthContextProvider ({children}: {children: React.ReactNode}) {

    const [userSession, setUserSession] = useState<ServerResponseAuthCheck | null>(null)

    useEffect(()=>{
        const fetchUserSession = async () => {

            const authCheckService = new AuthCheckService(remoteAxiosClient)
            try{
                const userSession = await authCheckService.send(undefined)
                setUserSession(userSession)
            }catch {
                setUserSession(null) //$ We now that the server is running because the proxy is working so we can safely set the user session to null
            }
        }
        fetchUserSession()
    }, [])

    const value: AuthContextType = {userSession, setUserSession}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>


}

export function useAuthContext () {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider")
    }
    return context
}