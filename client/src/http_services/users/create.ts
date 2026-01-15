import { backendPaths } from "@/src/lib/urls"
import { AxiosInstance } from "axios"



export class RegisterUserService {

    constructor(private httpClient: AxiosInstance){}

    async send(userName: string, email: string, password: string){
        const {data} = await this.httpClient.post(
            backendPaths.createUserPath,
            {
                user_name: userName,
                email,
                password
            }
        )

        return data
    }
}

