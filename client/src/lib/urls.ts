


class AppUrls {
    
    
    public authCheckUrl: string
    public createUserUrl: string
    
    constructor(public baseUrl: URL){
        
        this.authCheckUrl =  new URL('/users/auth-check', baseUrl.href, ).toString()
        
        this.createUserUrl =  new URL('/users/create', baseUrl.href).toString()
    }
    
}


const internalBackendUrl = process.env.INTERNAL_BACKEND_URL!
const remoteBackendUrl = process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL!


export const internalUrls = new AppUrls(new URL(internalBackendUrl))
export const remoteUrls = new AppUrls(new URL(remoteBackendUrl))