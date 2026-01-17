import { createShareableFileAccessPath } from "@/src/lib/server_paths";
import { AxiosInstance } from "axios";

export type ExpirationTimeUnit = "m" | "h" | "d" | "s"

export type ExpirationTimeType = {
    amount: number
    unit: ExpirationTimeUnit
}


export type CreateShareableFileAccessRequestBody = {
    file_id: string
    password: string | null
    expiration_time: ExpirationTimeType | null
    expires_when_opened: boolean
}

type CreateShareableFileAccessResponse = {
    path_to_shareable_file_access: string
}

export class CreateShareableFileAccessService {
    constructor (public httpClient: AxiosInstance) {}

    async send (body: CreateShareableFileAccessRequestBody) {
        const {data} = await this.httpClient.post<CreateShareableFileAccessResponse>(createShareableFileAccessPath, body)
        return data
    }
}   
