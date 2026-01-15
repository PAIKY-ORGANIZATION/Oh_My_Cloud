// Using cookies

import { NextRequest, NextResponse } from "next/server";
import { dashboard_path, unexpected_server_side_error_path } from "./lib/app_paths";
import { ServerResponseAuthCheck, auth_check } from "./remote/users/auth_check";
import { AxiosError } from "axios";





const get_session = async (): Promise<ServerResponseAuthCheck | null> => {
    //$ Doing try/catch here because "auth_check" should remain for http only errors
    try {
        return await auth_check()
    } catch (e) {
        if (e instanceof AxiosError){
            if (e.response?.status === 401){
                return null
            }
        }
        throw new Error('An unexpected error occurred while verifying the session from the server') //$ Let this bubble up
    } 
}







const protectedRoutes = [dashboard_path]

const unauthenticatedRoutes = ["/login", "/register"] //$ Authenticated users should not be able to access these routes

const middleware = async (request: NextRequest) => {
    try {   

        const currentPath = request.nextUrl.pathname //$ Will look like "/dashboard"

        console.log('Current path', currentPath)

        if (!protectedRoutes.includes(currentPath) && !unauthenticatedRoutes.includes(currentPath)){
            //$ Cases where the target route is neither protected nor unauthenticated
            return NextResponse.next()
        }


        const session: ServerResponseAuthCheck | null = await get_session()

        if(protectedRoutes.includes(currentPath) && !session) {
            return NextResponse.redirect(new URL('login', request.nextUrl)) //$ Don't use the `baseUrl` here because it points to the backend's port. Instead, `request.nextUrl` will contain the current hostname.
        } 

        if(unauthenticatedRoutes.includes(currentPath) && session) {
            return NextResponse.redirect(new URL('dashboard', request.nextUrl))
        }

        return NextResponse.next()
    
    } catch (e) {
        console.log('Error in middleware')
        console.log('Error in middleware')
        console.log('Error in middleware')
        console.log('Error in middleware')
        console.log('Error in middleware')
        console.log('Error in middleware')
        console.log('Error in middleware')
        // console.error(e)
        //? May find a way to also pass the error message to the error page, it is possible here.
        return NextResponse.redirect(new URL(unexpected_server_side_error_path, request.nextUrl))
    }
}

export default middleware;