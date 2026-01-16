import axios, { AxiosInstance } from "axios";

export function createHttpClient (backendBaseURL: string): AxiosInstance {
    return axios.create({
        baseURL: backendBaseURL,
        timeout: 15_000, //$ 15 seconds
        withCredentials: true //$ This M I G H T allow to send cookies to the backend. Haven't tested it yet.
    })
}