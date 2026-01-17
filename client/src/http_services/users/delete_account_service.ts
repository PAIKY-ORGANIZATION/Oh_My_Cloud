import { deleteAccountPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";

export class DeleteAccountService {
    constructor (private httpClient: AxiosInstance) {}

    async send () {
        const {data} = await this.httpClient.delete(deleteAccountPath)
        return data
    }
}