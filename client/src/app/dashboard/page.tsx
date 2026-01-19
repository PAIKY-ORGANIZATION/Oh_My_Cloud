import { GetUserFileListService } from "@/src/http_services/files/get_user_file_list_service"
import { internalAxiosClient } from "@/src/lib/http/internal_http_client"
import { cookies } from "next/headers"
import { DashboardClientComponent } from "./dashboard_client_component/dashboard_component"
import { AppError, toAppError } from "@/src/lib/http/app_error"
import { redirect } from "next/navigation"
import { unexpected_error_path } from "@/src/lib/app_paths"


export default  async function Dashboard (){
    
    
    const getUserFilesService = new GetUserFileListService(internalAxiosClient)
    
    let userFiles
    
    const cookieJar = await cookies()
    const authToken = cookieJar.get("AUTH_TOKEN")?.value
    try{
        userFiles = await getUserFilesService.send(authToken)
    }catch(e){
        const err: AppError = toAppError(e as Error)
        redirect(unexpected_error_path + "/" + err.message) //$ this automatically returns
        //! If at this point there  is some kind of error, the page won't load at all. Refine if necessary, example: just pass an error flag to the  <DashboardClientComponent>
    }

    return (
        <DashboardClientComponent initialUserFiles={userFiles}></DashboardClientComponent>
    )
}