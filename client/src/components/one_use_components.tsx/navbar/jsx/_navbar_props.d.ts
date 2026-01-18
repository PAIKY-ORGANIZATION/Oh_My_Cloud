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


