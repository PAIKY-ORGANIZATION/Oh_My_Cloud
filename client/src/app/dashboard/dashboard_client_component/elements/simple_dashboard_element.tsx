"use client"

import { downloadFilePath } from "@/src/lib/server_paths";
import { filesize } from "filesize";
import ShareFileModal from "../../modal_component/share_file_modal";
import { UserFile } from "@/src/http_services/files/get_user_file_list_service";
import { SetStateAction } from "react";
import { Dispatch } from "react";


type SimpleDashboardProps = {
    userFiles: UserFile []
    setShareModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedFileId: Dispatch<SetStateAction<string | null>>
    uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void
    deleteFile: (fileId: string) => void
    shareModalOpen: boolean
    selectedFileId: string | null
}

export default function  SimpleDashboard(props: SimpleDashboardProps) {
    const {userFiles, setShareModalOpen, setSelectedFileId, uploadFile, deleteFile, shareModalOpen, selectedFileId} = props

    return (

        <div className="border border-green-500 p-2">
            {shareModalOpen && selectedFileId && 
                <ShareFileModal fileId={selectedFileId} setShareModalOpen={setShareModalOpen} />
            }  {/* //$ MODAL LOGIC */}
            
            <div className="flex flex-col gap-4">
                {userFiles.map((userFile) => (
                    <div key={userFile.id} className="flex gap-5">
                        <h1>{userFile.original_file_name}</h1>
                        <p>{filesize(userFile.original_file_size)}</p>
                        <p>{userFile.id}</p>

                        <button  className="bg-red-500 px-1 hover:bg-red-400 cursor-pointer" onClick={()=>{deleteFile(userFile.id)}}>
                            Delete 
                        </button>
                        <button className="bg-green-500 px-1 hover:bg-green-400 cursor-pointer">
                            <a 
                                download={userFile.original_file_name}  //$  Hints the browser to force a download instead of opening the file in a new tab.
                                href={process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL + downloadFilePath + "/" + userFile.id}
                            >
                                
                                Download 
                            </a>
                        </button>

                        <button className="bg-blue-500 px-1 hover:bg-blue-400 cursor-pointer" onClick={()=>{setShareModalOpen(true); setSelectedFileId(userFile.id)}}>
                            Share
                        </button>
                    </div>
                ))}
            </div>
            <label htmlFor="upload-file" className="bg-orange-500 p-1 hover:bg-blue-600 cursor-pointer">  Upload File </label>
            <input 
                onChange={uploadFile}
                id="upload-file"     type="file"  multiple     hidden
            />
        </div>



    )
}