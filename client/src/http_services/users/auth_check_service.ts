import { authCheckPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";


export interface ServerResponseAuthCheck extends ServerResponse {
    id: string,
    user_name: string,
    email: string
} 


export class AuthCheckService {
    constructor(private httpClient: AxiosInstance){}
    async send(token: string | undefined): Promise<ServerResponseAuthCheck | null> {
        const {data} = await this.httpClient.get<ServerResponseAuthCheck>(authCheckPath, 
            {
                //$ If sending the  request from  middleware (proxy), it won't automatically send cookies for us as if the request was made from the client's browser.
                //! Also, the browser will automatically send cookies for us and it will BLOCK us from trying to append cookies manually.
                headers: token ? { Cookie: `AUTH_TOKEN=${token}`} : undefined
            }
        )

        return data
    }

}