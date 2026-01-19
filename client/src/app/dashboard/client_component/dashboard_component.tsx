"use client"

import { UserFile } from "@/src/http_services/files/get_user_file_list_service"
import { UploadFileService } from "@/src/http_services/files/upload_file_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { useState } from "react"
import { toast } from "react-toast"
import { useRouter } from "next/navigation"
import { filesize } from  "filesize"
import { DeleteFileService } from "@/src/http_services/files/delete_file"
import { handleFrontendHttpError } from "@/src/utils/handle_frontend_error"
import { downloadFilePath } from "@/src/lib/server_paths"
import ShareFileModal from "./elements/modal/share_file_modal"
import SimpleDashboard from "./elements/dashboard/simple_dashboard_element"


export function DashboardClientComponent ({initialUserFiles}: {initialUserFiles: UserFile []}) {

    const [userFiles, setUserFiles] = useState<UserFile []>(initialUserFiles)

    const [shareModalOpen, setShareModalOpen] = useState(false)
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null) //$ For the modal to know which file to share

    const router = useRouter()

    async function uploadFile (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList: FileList | null = e.target.files
        if ( fileList === null || fileList.length === 0) return

        const file = fileList[0]

        const formData = new FormData()
        formData.append("my_field_name", file)

        const uploadFileService = new UploadFileService(remoteAxiosClient)
        // console.log(await file.arrayBuffer()) //! Doing this, for example, will buffer the file in the browser's memory

        try{
            const {file_id} =  await uploadFileService.send(formData)
            toast.success("File uploaded successfully")

            const newUserFile: UserFile  =  {
                id: file_id,
                original_file_name: file.name,
                original_file_size: file.size
            }

            setUserFiles([...userFiles, newUserFile])
            
        }catch(e){
            handleFrontendHttpError(e as Error, router)
        }
    }


    async function deleteFile (fileId: string) {
        const deleteFileService = new DeleteFileService(remoteAxiosClient)
        try{
            await deleteFileService.send(fileId)
            toast.success("File deleted successfully")
            setUserFiles(userFiles.filter((userFiles)=> userFiles.id !== fileId))
        } catch (e) {
            handleFrontendHttpError(e as Error, router)
        }
    }



    return (
        <SimpleDashboard
            userFiles={userFiles}
            setShareModalOpen={setShareModalOpen}
            setSelectedFileId={setSelectedFileId}
            uploadFile={uploadFile}
            deleteFile={deleteFile}
            shareModalOpen={shareModalOpen}
            selectedFileId={selectedFileId}
        />
    )
}
