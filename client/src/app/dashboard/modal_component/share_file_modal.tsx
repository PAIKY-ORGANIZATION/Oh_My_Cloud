"use client"

import { CreateShareableFileAccessRequestBody, CreateShareableFileAccessService, ExpirationTimeUnit } from "@/src/http_services/shareable/create_shareable_file_access_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "react-toast"
import SimpleModal from "./elements/simple_modal_component"

export default function  ShareFileModal({fileId,  setShareModalOpen}: {fileId: string, setShareModalOpen: Dispatch<SetStateAction<boolean>>}) {


    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false)
    const [showExpirationTimeInput, setShowExpirationTimeInput] = useState<boolean>(false)

    const router = useRouter()

    async function createShareableFileAccess(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formElement = e.currentTarget  //$ This is the actual <form> element
        const formData = new  FormData(formElement)  //$ `new FormData` accepts an `HTMLFormElement` in its constructor.

        const password = formData.get('password') as string | null
        const expirationTimeAmount = formData.get('expiration_time_amount') as number | null
        const expirationTimeUnit = formData.get('unit') as ExpirationTimeUnit | null
        const expiresWhenOpened = formData.get('expires_when_opened') as boolean | null

        if (showPasswordInput && (!password || password.length < 8)) {
            toast.error("Password must be at least 8 characters long")
            return
        }

        const createShareableFileAccessRequestBody: CreateShareableFileAccessRequestBody = {
            file_id: fileId,
            password: password,
            expiration_time: showExpirationTimeInput ? 
                {amount: expirationTimeAmount as number, unit: expirationTimeUnit as ExpirationTimeUnit} 
                : null,
            expires_when_opened: expiresWhenOpened || false
        }

        const createShareableFileAccessService = new CreateShareableFileAccessService(remoteAxiosClient)

        try{
            const {path_to_shareable_file_access} = await createShareableFileAccessService.send(createShareableFileAccessRequestBody)
            const link_to_shareable_file_access = process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL + path_to_shareable_file_access
            await navigator.clipboard.writeText(link_to_shareable_file_access) //$ Attaching the link to the clipboard
            toast.success("Success! Shareable file access link copied to clipboard");
            setShareModalOpen(false)
        }catch(e){
            handleFrontendHttpError(e as Error, router)
        }
    }


    return (
        <
            SimpleModal
            fileId={fileId}
            setShowPasswordInput={setShowPasswordInput}
            showPasswordInput={showPasswordInput}
            setShowExpirationTimeInput={setShowExpirationTimeInput}
            showExpirationTimeInput={showExpirationTimeInput}
            createShareableFileAccess={createShareableFileAccess}
            setShareModalOpen={setShareModalOpen}
        />
    )
}