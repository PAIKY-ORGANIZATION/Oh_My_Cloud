import { loginUserPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";




export class LoginUserService {
    constructor (private httpClient: AxiosInstance) {} 

    async send (email: string, password: string) {
        await this.httpClient.post<null>(loginUserPath, {email, password}) //$ Currently doesn't return data.
    }
}