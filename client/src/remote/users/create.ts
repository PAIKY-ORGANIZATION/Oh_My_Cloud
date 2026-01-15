import { axiosClient } from "@/src/lib/axios_client"
import { createUserUrl } from "@/src/lib/urls"

export const createUser = async (userName: string, email: string, password: string)=>{


    const {data} = await axiosClient.post(
        createUserUrl, 
        {
            user_name: userName,
            email,
            password
        },
        
    )

    return data

}