"use client"
import { createContext, useEffect, useState } from "react"


type UserSession =  {email: string, username: string} | null
type AuthContextType = {

    userSession: UserSession
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContextProvider = ({children}: {children: React.ReactNode})=>{

    const [session, setSession] = useState<UserSession | null>(null)

    useEffect(()=>{
        session 
    }, [])



}
