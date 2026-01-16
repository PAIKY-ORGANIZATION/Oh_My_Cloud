// Using cookies

import { NextRequest, NextResponse } from "next/server";
import { dashboard_path, login_path, register_path, unexpected_error_path } from "./lib/app_paths";
import { AuthCheckService, ServerResponseAuthCheck } from "./http_services/users/auth_check_service";
import { internalAxiosClient } from "./lib/http/internal_http_client";
import { AppError, toAppError } from "./lib/http/app_error";
import { cookies } from "next/headers";


const protectedRoutes = [dashboard_path]
const unauthenticatedRoutes = [login_path, register_path] //$ Authenticated users should not be able to access these routes


async function middleware  (request: NextRequest)  {


    const currentPath = request.nextUrl.pathname //$ Will look like "/dashboard"


    if (currentPath.startsWith(unexpected_error_path) || currentPath.startsWith("/_next")){
        return NextResponse.next()
    }

    let session: ServerResponseAuthCheck | null

    const authCheckService = new  AuthCheckService(internalAxiosClient)

    const cookieJar = await cookies()
    const authToken = cookieJar.get("AUTH_TOKEN")?.value

    console.log(currentPath + " is the current path")
    //$ Try/catch and session and managed this way to keep the legacy "session" logic
    try 
    {
        session = await authCheckService.send(authToken)
    } catch (e) 
    {

        const appError: AppError = toAppError(e as Error)

        if (appError.kind == "http" && appError.status === 401){
            session = null
        }else {
            return NextResponse.redirect(new URL(unexpected_error_path + "/" + appError.message, request.nextUrl))
        } 
    }

    if (protectedRoutes.includes(currentPath) && !session) {
        return NextResponse.redirect(new URL('login', request.nextUrl)) //$ Don't use the `baseUrl` here because it points to the backend's port. Instead, `request.nextUrl` will contain the current hostname.
    } 

    if (unauthenticatedRoutes.includes(currentPath) && session) {
        return NextResponse.redirect(new URL(dashboard_path, request.nextUrl))
    }

    if (currentPath === "/"){
        if (session){
            return NextResponse.redirect(new URL(dashboard_path, request.nextUrl))
        } else {
            return NextResponse.redirect(new URL(login_path, request.nextUrl))
        }
    }

    return NextResponse.next()

}

export default middleware;