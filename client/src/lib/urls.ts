

const protocol = process.env.NEXT_PUBLIC_REMOTE_BACKEND_HTTP_PROTOCOL
const host = process.env.NEXT_PUBLIC_REMOTE_BACKEND_HOST
const port = process.env.NEXT_PUBLIC_REMOTE_BACKEND_PORT


export const baseUrl = new URL(`${protocol}://${host}:${port}`)

export const authCheckUrl =  new URL('/users/auth-check', baseUrl.href, ).toString()

export const createUserUrl =  new URL('/users/create', baseUrl.href).toString()