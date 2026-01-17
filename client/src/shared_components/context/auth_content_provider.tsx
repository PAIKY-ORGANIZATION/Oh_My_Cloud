"use client"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"


type UserSession =  {email: string, username: string} | null

type AuthContextType = {
    userSession: UserSession
    setUserSession: Dispatch<SetStateAction<UserSession | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthContextProvider ({children}: {children: React.ReactNode}) {

    const [userSession, setUserSession] = useState<UserSession | null>(null)

    useEffect(()=>{
        
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