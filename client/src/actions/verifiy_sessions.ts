import { AxiosError } from "axios"
import { axiosClient } from "../lib/axios_client"
import { authCheckUrl } from "../lib/urls"


export interface ServerResponseAuthCheck extends ServerResponse {
    data: {
        id: string,
        user_name: string,
        email: string
    }
} 


export const verifySession = async (): Promise<ServerResponseAuthCheck | null>  =>{

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