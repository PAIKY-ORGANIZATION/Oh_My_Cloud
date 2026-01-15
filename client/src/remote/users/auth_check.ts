import { axiosClient } from "@/src/lib/axios_client"
import { authCheckUrl } from "@/src/lib/urls"


export interface ServerResponseAuthCheck extends ServerResponse {
    data: {
        id: string,
        user_name: string,
        email: string
    }
} 


export async function auth_check (): Promise<ServerResponseAuthCheck | null> {

    const {data} = await axiosClient.get<ServerResponseAuthCheck>(authCheckUrl)

    return data

}