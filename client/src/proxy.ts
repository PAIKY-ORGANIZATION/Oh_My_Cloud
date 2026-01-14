// Using cookies

import { NextRequest, NextResponse } from "next/server";
import { dashboard_path } from "./lib/app_paths";
import { ServerResponseAuthCheck, verifySession } from "./actions/verifiy_sessions";
import { baseUrl } from "./lib/urls";





const protectedRoutes = [dashboard_path]

const middleware = async (request: NextRequest) => {
    // console.log('Middleware', request.cookies);

    const currentPath = request.nextUrl.pathname //$ Will look like "/dashboard"

    console.log('Current path', currentPath)

    if (!protectedRoutes.includes(currentPath)){
        return NextResponse.next()
    }

    const session: ServerResponseAuthCheck | null= await verifySession()
    if (!session) {
        return NextResponse.redirect(new URL('login', baseUrl))
    }


    NextResponse.next()

}

export default middleware;