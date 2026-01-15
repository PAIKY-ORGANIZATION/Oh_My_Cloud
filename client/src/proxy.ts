// Using cookies

import { NextRequest, NextResponse } from "next/server";
import { dashboard_path, unexpected_error_path } from "./lib/app_paths";
import { AuthCheckService, ServerResponseAuthCheck } from "./http_services/users/auth_check";
import { internalAxiosClient } from "./lib/http/internal_http_client";
import { AppError, toAppError } from "./lib/http/app_error";




const protectedRoutes = [dashboard_path]

const unauthenticatedRoutes = ["/login", "/register"] //$ Authenticated users should not be able to access these routes

async function middleware  (request: NextRequest)  {

    const currentPath = request.nextUrl.pathname //$ Will look like "/dashboard"

    if (!protectedRoutes.includes(currentPath) && !unauthenticatedRoutes.includes(currentPath)){
        //$ Cases where the target route is neither protected nor unauthenticated
        return NextResponse.next()
    }


    let session: ServerResponseAuthCheck | null

    const authCheckService = new  AuthCheckService(internalAxiosClient)

    //$ Try/catch and session and managed this way to keep the legacy "session" logic
    try {
        session = await authCheckService.send()
    } catch (e) {
        const appError: AppError = toAppError(e as Error)

        if (appError.kind == "http" && appError.status === 401){
            session = null
        }else {
            return NextResponse.redirect(new URL(unexpected_error_path + "/" + appError.message, request.nextUrl))
        } 
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