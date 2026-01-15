// Using cookies

import { NextRequest, NextResponse } from "next/server";
import { dashboard_path } from "./lib/app_paths";
import { ServerResponseAuthCheck, auth_check } from "./remote/users/auth_check";
import { AxiosError } from "axios";





const protectedRoutes = [dashboard_path]

const unauthenticatedRoutes = ["/login", "/register"] //$ Authenticated users should not be able to access these routes

const middleware = async (request: NextRequest) => {

    const currentPath = request.nextUrl.pathname //$ Will look like "/dashboard"

    console.log('Current path', currentPath)

    if (!protectedRoutes.includes(currentPath) && !unauthenticatedRoutes.includes(currentPath)){
        //$ Cases where the target route is neither protected nor unauthenticated
        return NextResponse.next()
    }


    let session: ServerResponseAuthCheck | null

    try {
        session = await auth_check()
    } catch (e) {
        if (e instanceof AxiosError){
            if (e.response?.status === 401){
                session = null
            }
        } 
        console.error(e)
        //? Check if this is the correct way to handle all this
        throw new Error('An unexpected error occurred while verifying the session from the server')
    }

    if(protectedRoutes.includes(currentPath) && !session) {
        return NextResponse.redirect(new URL('login', request.nextUrl)) //$ Don't use the `baseUrl` here because it points to the backend's port. Instead, `request.nextUrl` will contain the current hostname.
    } 

    if(unauthenticatedRoutes.includes(currentPath) && session) {
        return NextResponse.redirect(new URL('dashboard', request.nextUrl))
    }

    return NextResponse.next()
}

export default middleware;