"use client"

import { ConsumeShareableFileAccessWithPasswordService } from "@/src/http_services/shareable/consume_shareable_file_access_with_password_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { useRouter } from "next/navigation"
import { toast } from "react-toast"
import ExtendedUnlockShareableFileAccessElement from "./elements/extended_unlock_shareable_file_access_element"
import { isAxiosError } from "axios"

export default function  UnlockShareableFileAccessClientComponent({shareableFileAccessId}: {shareableFileAccessId: string}) {
    
    const router = useRouter()
    
    async function downloadFile (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.
        const password = formData.get('password') as string | null
        if (!password) {
            toast.error("Password is required")
            return
        }

        const consumeShareableFileAccessWithPasswordService = new ConsumeShareableFileAccessWithPasswordService(remoteAxiosClient)
        let file: Blob
        let fileName: string
        try{ //! Only for HTTP errors, don't catch other frontend errors here, that gives issues.

            const data = await consumeShareableFileAccessWithPasswordService.send(shareableFileAccessId, password)
            file = data.file
            fileName = data.fileName
            
        }catch(e){
            if (isAxiosError(e) && e.response?.data instanceof Blob) { //$ This is only needed here because "consumeShareableFileAccessWithPasswordService" asks for a blob, but if there is an error, the error data will also come as a blob and needs to be parsed.
                const text = await e.response.data.text()
                const data = JSON.parse(text)
                toast.error(data.message || "An unknown error occurred from server")
                return
            }
            handleFrontendHttpError(e as Error, router)
            return
        }
        
        const url = URL.createObjectURL(file)

        //$ This technique is used to create a regular anchor element that looks like the  ones we use in files like "./dashboard/dashboard_client_component.tsx" It allows to download to the  client's pc directly by clicking on it.
        const ephemeralAnchorElement = document.createElement('a')
        ephemeralAnchorElement.href = url
        ephemeralAnchorElement.download = fileName
        ephemeralAnchorElement.click()

    }
    
    
    
    return (
        <ExtendedUnlockShareableFileAccessElement
            downloadFile={downloadFile} 
            shareableFileAccessId={shareableFileAccessId}
        />
    )
}