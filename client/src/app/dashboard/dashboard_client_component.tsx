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


export function DashboardClientComponent ({initialUserFiles}: {initialUserFiles: UserFile []}) {

    const [userFiles, setUserFiles] = useState<UserFile []>(initialUserFiles)

    const router = useRouter()

    async function uploadFile (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList: FileList | null = e.target.files
        if (!fileList) return

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
        <div className="border border-green-500 p-2">
            <div className="flex flex-col gap-4">
                {userFiles.map((userFile) => (
                    <div key={userFile.id} className="flex gap-5">
                        <h1>{userFile.original_file_name}</h1>
                        <p>{filesize(userFile.original_file_size)}</p>
                        <p>{userFile.id}</p>

                        <button  className="bg-red-500 hover:bg-red-400 cursor-pointer" onClick={()=>{deleteFile(userFile.id)}}>
                            Delete 
                        </button>
                    </div>
                ))}
            </div>
            <></>
            <label htmlFor="upload-file" className="bg-blue-500 p-1 hover:bg-blue-600 cursor-pointer">  Upload File </label>
            <input 
                className="bg-blue-500 text-white p-1 hover:bg-blue-600 cursor-pointer"
                onChange={uploadFile}
                id="upload-file"     type="file"  multiple     hidden
            />
        </div>
    )

}
