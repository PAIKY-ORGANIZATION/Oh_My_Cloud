import { axiosClient } from "@/src/lib/axios_client"
import { authCheckUrl } from "@/src/lib/urls"


export interface ServerResponseAuthCheck extends ServerResponse {
    data: {
        id: string,
        user_name: string,
        email: string
    }
} 


export const auth_check = async (): Promise<ServerResponseAuthCheck | null>  =>{

    const {data} = await axiosClient.get<ServerResponseAuthCheck>(authCheckUrl)

    return data
    

}