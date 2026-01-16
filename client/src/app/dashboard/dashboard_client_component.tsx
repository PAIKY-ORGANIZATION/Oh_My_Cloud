"use client"

import { UserFile } from "@/src/http_services/files/get_user_file_list_service"
import { UploadFileService } from "@/src/http_services/files/upload_file_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { useState } from "react"
import { toast } from "react-toast"




export function DashboardClientComponent ({initialUserFiles}: {initialUserFiles: UserFile []}) {

    const [userFiles, setUserFiles] = useState<UserFile []>(initialUserFiles)

    async function uploadFile (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList: FileList | null = e.target.files
        if (!fileList) return
        console.log(fileList[0])

        const formData = new FormData()
        formData.append("my_field_name", fileList[0])

        const uploadFileService = new UploadFileService(remoteAxiosClient)

        await uploadFileService.send(formData)
        
        toast.success("File uploaded successfully")

    }

    return (
        <div className="border border-green-500 p-2">
            <div className="flex flex-col gap-4">
                {userFiles.map((userFile) => (
                    <div key={userFile.id}>
                        <h1>{userFile.original_file_name}</h1>
                        <p>{userFile.original_file_size}</p>
                        <p>{userFile.id}</p>
                    </div>
                ))}
            </div>

            <label htmlFor="upload-file">  Upload File </label>
            <input 
                className="bg-blue-500 text-white p-1 hover:bg-blue-600 cursor-pointer"
                onChange={uploadFile}
                id="upload-file"     type="file"  multiple 
            />
        </div>
    )

}
