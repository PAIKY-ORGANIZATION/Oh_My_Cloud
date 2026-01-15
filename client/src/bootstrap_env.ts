



const environment = process.env.ENVIRONMENT //$ This is set  in the npm scrips (like "npm run local")
import dotenv from "dotenv"


const requiredEnvVars: string[] = [
    "NEXT_PUBLIC_REMOTE_BACKEND_URL",
    "INTERNAL_BACKEND_URL"
]

function loadENV (){
    dotenv.config({path: `./config/${environment}_private.env`})
    dotenv.config({path:  `./config/${environment}_public.env`})

    for (const env of requiredEnvVars) {
        if(!process.env[env]){
            throw new Error(`Environment variable ${env} is not set`)
        }
    }

}



loadENV()