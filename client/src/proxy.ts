// Using cookies

import { NextRequest } from "next/server";
import {authCheckUrl} from './lib/urls'
import { axiosClient } from "./lib/axios_client";
import { AxiosError } from "axios";


interface ServerResponseAuthCheck extends ServerResponse {
    data: {
        id: string,
        user_name: string,
        email: string
    }
} 


const middleware = async (request: NextRequest) => {
    // console.log('Middleware', request.cookies);

    try {
        const response = await axiosClient.get<ServerResponseAuthCheck>(authCheckUrl)
    
        console.log(response.data)
        
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError) {
            console.error(error.response?.data)
        } 
    }

}

export default middleware;