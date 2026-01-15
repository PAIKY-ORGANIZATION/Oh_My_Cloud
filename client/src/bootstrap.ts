



const environment = process.env.ENVIRONMENT //$ This is set  in the npm scrips (like "npm run local")
import dotenv from "dotenv"


const requiredEnvVars: string[] = [
    'NEXT_PUBLIC_BACKEND_HTTP_PROTOCOL',
    'NEXT_PUBLIC_BACKEND_HOST',
    'NEXT_PUBLIC_BACKEND_PORT',
]

const loadENV = ()=>{
    dotenv.config({path: `./config/${environment}.env`})

    for (const env of requiredEnvVars) {
        if(!process.env[env]){
            throw new Error(`Environment variable ${env} is not set`)
        }
    }

}



loadENV()