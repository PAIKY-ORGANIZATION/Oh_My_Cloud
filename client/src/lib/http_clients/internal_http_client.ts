
//* Used in server-side code like middleware

import { createHttpClient } from "./create_http_client"



//$ Loading from it's own httpClient file prevents the client-side HttpClient to have access to a file where internal ENV variables are also loaded.
const internalBackendUrl = process.env.INTERNAL_BACKEND_URL!

export const internalAxiosClient = createHttpClient(internalBackendUrl)