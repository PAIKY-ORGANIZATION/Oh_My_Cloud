import { createUserPath } from "@/src/lib/server_paths"
import { AxiosInstance } from "axios"


type ServerResponseRegister =  {
    id: string
    user_name: string
    email: string
    
}


export class RegisterUserService {

    constructor(private httpClient: AxiosInstance){}

    async send(userName: string, email: string, password: string){
        const {data} = await this.httpClient.post<ServerResponseRegister>(
            createUserPath,
            {
                user_name: userName,
                email,
                password
            },
        )

        return data
    }
}

