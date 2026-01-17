import { AxiosInstance } from "axios";

export class ConsumeShareableFileAccessWithPasswordService {
    constructor (private httpClient: AxiosInstance) {}

    async send (shareableFileAccessId: string, password: string) {
        const response = await this.httpClient.get<Blob>("/shareable" + "/" + shareableFileAccessId, 
            {
                responseType: "blob", //$ Required to download the file as a blob
                headers: {
                    "X-File-Password": password
                }
            }
        )

        const fileName = response.headers['content-disposition']?.split('filename=')[1] || "downloaded_file.bin" //$ FastAPI will automatically sent the 'content-disposition' header with the file name.
        return {file: response.data, fileName: fileName}
    }
}