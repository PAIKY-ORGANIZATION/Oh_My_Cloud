

import { createHttpClient } from "./create_http_client"

export const remoteBackendUrl = process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL!

export const remoteAxiosClient = createHttpClient(remoteBackendUrl)