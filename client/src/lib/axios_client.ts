import axios, { AxiosInstance } from 'axios'
import { internalBackendUrl, remoteBackendUrl } from './urls'




function createHttpClient (backendBaseURL: string): AxiosInstance {
    return axios.create({
        baseURL: backendBaseURL,
        timeout: 15_000 //$ 15 seconds
    })
}

//* Used in server-side code like middleware
export const internalAxiosClient = createHttpClient(internalBackendUrl)

//* Used in client-side code    
export const remoteAxiosClient = createHttpClient(remoteBackendUrl)