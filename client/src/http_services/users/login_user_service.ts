import { loginUserPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";
import { ServerResponseAuthCheck } from "./auth_check_service";




export class LoginUserService {
    constructor (private httpClient: AxiosInstance) {} 

    async send (email: string, password: string) {
        const {data}= await this.httpClient.post<ServerResponseAuthCheck>(loginUserPath, {email, password}) //$ Currently doesn't return data.
        return data
    }
}