



const environment = process.env.ENVIRONMENT //$ This is set  in the npm scrips (like "npm run local")
import dotenv from "dotenv"

const loadENV = ()=>{
    dotenv.config({path: `./config/${environment}.env`})
    console.log(process.env.BACKEND_HTTP_PROTOCOL)
    console.log(process.env.BACKEND_HOST)
    console.log(process.env.BACKEND_PORT)
}



loadENV()