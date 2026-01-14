// Using cookies

import { NextRequest } from "next/server";
import axios from "axios"


const middleware = async (request: NextRequest) => {
    console.log('Middleware', request.cookies);


    const response = await axios.get()

}

export default middleware;