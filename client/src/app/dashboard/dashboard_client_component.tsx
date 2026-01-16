"use client"

import { UserFile } from "@/src/http_services/files/get_user_file_list_service"
import { useState } from "react"




export function DashboardClientComponent ({initialUserFiles}: {initialUserFiles: UserFile []}) {

    const [userFiles, setUserFiles] = useState<UserFile []>(initialUserFiles)

    function uploadFile (e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        console.log(files)
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
