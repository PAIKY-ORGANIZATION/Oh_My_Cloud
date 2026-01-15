import { AxiosError } from "axios"

export type AppError = 
| {kind: "http", status: number, code?: string, message?: string}
| {kind: "timeout", message?: string}
| {kind: "unknown", message?: string}
| {kind: "network", message?: string} //$ This includes: backend not active, unreachable, wrong host, DNS resolution errors, CORS, etc

interface StandardBackendErrorData {
    code?: string
    message?: string
    details?: unknown
}



export function toAppError(err: Error): AppError {
    if (err instanceof AxiosError){
        
        //$ "err.code" is NOT the  status code, it is a string and is used by axios to identify the error type.
        if(err.code === "ECONNABORTED"){ 
            return {kind: "timeout", message: "Request timed out"}
        }

        
        if(!err.response){  //$ This includes: backend not active, unreachable, wrong host, DNS resolution errors, CORS, etc
            return {kind: "network", message: "Backend is not active or unreachable"}
        }

        
        const data: StandardBackendErrorData = err.response?.data

        return {
            kind: "http",
            code: data.code,
            message: data.message,
            status: err.response?.status  || 500
        }
    }

    return {kind: "unknown", message: err.message}
}