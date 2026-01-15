import { authCheckPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";


export interface ServerResponseAuthCheck extends ServerResponse {
    id: string,
    user_name: string,
    email: string
} 


export class AuthCheckService {

    constructor(private httpClient: AxiosInstance){}

    async send(): Promise<ServerResponseAuthCheck | null> {
        const {data} = await this.httpClient.get<ServerResponseAuthCheck>(authCheckPath)

        return data
    }

}