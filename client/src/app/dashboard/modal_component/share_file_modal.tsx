"use client"

import { CreateShareableFileAccessRequestBody, CreateShareableFileAccessService, ExpirationTimeUnit } from "@/src/http_services/shareable/create_shareable_file_access_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "react-toast"
import SimpleModal from "./elements/simple_modal_component"
import ExtendedModal from "./elements/extended_modal_component"

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

        const createShareableFileAccessRequestBody: CreateShareableFileAccessRequestBody = {
            file_id: fileId,
            password: password,
            expiration_time: showExpirationTimeInput ? 
                {amount: expirationTimeAmount as number, unit: expirationTimeUnit as ExpirationTimeUnit} 
                : null,
            expires_when_opened: expiresWhenOpened || false
        }

        const createShareableFileAccessService = new CreateShareableFileAccessService(remoteAxiosClient)
        let path_to_shareable_file_access: string

        try{ //! Only for HTTP errors, don't catch other frontend errors here, that gives issues.
            const data = await createShareableFileAccessService.send(createShareableFileAccessRequestBody)
            path_to_shareable_file_access = data.path_to_shareable_file_access
        }catch(e){
            handleFrontendHttpError(e as Error, router)
            return
        }

        const link_to_shareable_file_access = process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL + path_to_shareable_file_access
        await navigator.clipboard.writeText(link_to_shareable_file_access) //$ Attaching the link to the clipboard
        toast.success("Success! Shareable file access link copied to clipboard");
        setShareModalOpen(false)
    }


    return (
        <ExtendedModal
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