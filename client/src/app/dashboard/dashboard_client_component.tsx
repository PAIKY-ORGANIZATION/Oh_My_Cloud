"use client"

import { UserFile } from "@/src/http_services/files/get_user_file_list_service"
import { useState } from "react"





export function DashboardClientComponent ({initialUserFiles}: {initialUserFiles: UserFile []}) {

    const [userFiles, setUserFiles] = useState<UserFile []>(initialUserFiles)
    return (
        <div>
            {userFiles.map((userFile) => (
                <div key={userFile.id}>
                    <h1>{userFile.original_file_name}</h1>
                    <p>{userFile.original_file_size}</p>
                    <p>{userFile.id}</p>
                </div>
            ))}
        </div>
    )

}