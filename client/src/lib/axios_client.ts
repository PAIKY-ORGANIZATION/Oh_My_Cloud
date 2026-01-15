import axios from 'axios'
import { internalUrls, remoteUrls } from './urls'

//* Used in server-side code like middleware
export const internalAxiosClient = axios.create({
    baseURL: internalUrls.baseUrl.toString()
})


//* Used in client-side code
export const remoteAxiosClient = axios.create({
    baseURL: remoteUrls.baseUrl.toString()
})