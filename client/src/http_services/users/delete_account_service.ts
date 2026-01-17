import { deleteAccountPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";

export class DeleteAccountService {
    constructor (private httpClient: AxiosInstance) {}

    async send (password: string) {
        const {data} = await this.httpClient.delete(deleteAccountPath,
            {
                headers: {
                    "X-User-Password": password
                }
            }
        )
        return data
    }
}