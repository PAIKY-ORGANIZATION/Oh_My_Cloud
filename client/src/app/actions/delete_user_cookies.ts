"use server"


import { cookies } from "next/headers"




export async function deleteUserCookies () {
    const cookieJar = await cookies()
    cookieJar.delete("AUTH_TOKEN")
}