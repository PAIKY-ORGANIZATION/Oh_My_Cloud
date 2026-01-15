import { axiosClient } from "@/src/lib/axios_client"
import { authCheckUrl } from "@/src/lib/urls"
import { AxiosError } from "axios"


export interface ServerResponseAuthCheck extends ServerResponse {
    data: {
        id: string,
        user_name: string,
        email: string
    }
} 


export const auth_check = async (): Promise<ServerResponseAuthCheck | null>  =>{

    try {
        const {data} = await axiosClient.get<ServerResponseAuthCheck>(authCheckUrl)
    
        return data
        
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error.response?.data)
            return null
        } 

        console.error(error)
        throw new Error('An unexpected error occurred while verifying the session')

    }

}