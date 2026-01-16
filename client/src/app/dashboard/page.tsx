import { GetUserFileListService } from "@/src/http_services/files/get_user_file_list_service"
import { internalAxiosClient } from "@/src/lib/http/internal_http_client"
import { cookies } from "next/headers"
import { DashboardClientComponent } from "./dashboard_client_component"

export default  async function Dashboard (){
    
    const cookieJar = await cookies()
    const authToken = cookieJar.get("AUTH_TOKEN")?.value

        
    const getUserFilesService = new GetUserFileListService(internalAxiosClient)
    const userFiles = await getUserFilesService.send(authToken)
    
    
    
    
    return (
        <DashboardClientComponent initialUserFiles={userFiles}></DashboardClientComponent>
    )

}