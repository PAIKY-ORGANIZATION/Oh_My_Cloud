// Using cookies

import { NextRequest, NextResponse } from "next/server";
import { dashboard_path } from "./lib/app_paths";
import { baseUrl } from "./lib/urls";
import { ServerResponseAuthCheck, auth_check } from "./remote/users/auth_check";





const protectedRoutes = [dashboard_path]

const middleware = async (request: NextRequest) => {

    const currentPath = request.nextUrl.pathname //$ Will look like "/dashboard"

    console.log('Current path', currentPath)

    if (!protectedRoutes.includes(currentPath)){
        return NextResponse.next()
    }

    const session: ServerResponseAuthCheck | null= await auth_check()
    if (!session) {
        return NextResponse.redirect(new URL('login', baseUrl))
    }


    NextResponse.next()

}

export default middleware;