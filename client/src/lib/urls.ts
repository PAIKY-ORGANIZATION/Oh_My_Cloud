

const protocol = process.env.BACKEND_HTTP_PROTOCOL
const host = process.env.BACKEND_HOST
const port = process.env.BACKEND_PORT

const baseUrl = new URL(`${protocol}://${host}:${port}`)

