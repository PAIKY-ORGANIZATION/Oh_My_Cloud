import { getUserFileListPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";


export type UserFile = {
    id: string
    original_file_name: string
    original_file_size: number
}

type ServerResponseGetUserFileList = UserFile []


export class GetUserFileListService {

    constructor (private httpClient: AxiosInstance) {}

    async send (token: string | undefined) {
        const {data} = await this.httpClient.get<ServerResponseGetUserFileList>(getUserFileListPath,
            {
                //$ If sending the  request from  middleware (proxy), it won't automatically send cookies for us as if the request was made from the client's browser.
                //! Also, the browser will automatically send cookies for us and it will BLOCK us from trying to append cookies manually.
                headers: token ? { Cookie: `AUTH_TOKEN=${token}`} : undefined
            }
        )
        return data
    }

}