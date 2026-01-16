import { deleteFilePath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";



export class DeleteFileService  {

    constructor (private httpClient: AxiosInstance) {}

    async send (fileId: string) {
        const {data} = await this.httpClient.delete(deleteFilePath + "/" + fileId)
        return data
    }

}