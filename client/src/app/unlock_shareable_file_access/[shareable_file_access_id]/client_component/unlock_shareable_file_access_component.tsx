"use client"

import { ConsumeShareableFileAccessWithPasswordService } from "@/src/http_services/shareable/consume_shareable_file_access_with_password_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { useRouter } from "next/navigation"
import { toast } from "react-toast"

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
        <div className="h-full w-full border border-red-500 flex justify-center items-center">
            <form className="border border-green-500 p-2 flex flex-col gap-2" onSubmit={downloadFile}>
                <label htmlFor="password"> Enter password for shareable file access  with id: {shareableFileAccessId}</label>
                <input type="password" id="password" name="password" placeholder="Type your password here" className="border border-gray-300 rounded "></input>
                <button type="submit" > Verify and download </button>
            </form>
        </div>
    )
}