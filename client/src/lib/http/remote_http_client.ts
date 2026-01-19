

import { createHttpClient } from "./create_http_client"



//$ Loading from it's own httpClient file prevents the client-side HttpClient to have access to a file where internal ENV variables are also loaded.
export const remoteBackendUrl = process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL!



export const remoteAxiosClient = createHttpClient(remoteBackendUrl)