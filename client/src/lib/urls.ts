

const protocol = process.env.BACKEND_HTTP_PROTOCOL
const host = process.env.BACKEND_HOST
const port = process.env.BACKEND_PORT

export const baseUrl = new URL(`${protocol}://${host}:${port}`)

export const authCheckUrl =  new URL('/users/auth-check', baseUrl.href, ).toString()

export const createUserUrl =  new URL('/users/create', baseUrl.href, ).toString()