import { uploadFilePath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";

export class UploadFileService {

    constructor (private httpClient: AxiosInstance) {}

    async send (formData: FormData) 
    {


        const {data} = await this.httpClient.post(uploadFilePath, formData)  //$ It's supposed that at this point the file is still a reference to the user's file system and will be automatically chunked and streamed to the server.
    
        return data
        
    }

}