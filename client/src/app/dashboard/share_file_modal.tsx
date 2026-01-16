"use client"

import { CreateShareableFileAccessRequestBody, CreateShareableFileAccessService, ExpirationTimeUnit } from "@/src/http_services/shareable/create_shareable_file_access_service"
import { remoteAxiosClient } from "@/src/lib/http/remote_http_client"
import { useState } from "react"

export default function  ShareFileModal({fileId}: {fileId: string}) {


    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false)
    const [showExpirationTimeInput, setShowExpirationTimeInput] = useState<boolean>(false)



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
                expires_when_opened: expiresWhenOpened as boolean
        }

        const createShareableFileAccessService = new CreateShareableFileAccessService(remoteAxiosClient)
        try{
            const result = await createShareableFileAccessService.send(createShareableFileAccessRequestBody)
        }catch(e){
            console.log(e);	
        }
    }


    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-[#131313] border border-[#202020] rounded  flex flex-col w-[90vw] max-w-[420px] min-h-[300px]">
                <p>Share File Modal {fileId} </p>
                <form onSubmit={createShareableFileAccess} className="flex flex-col gap-2">
                    <button 
                        onClick={()=>{setShowPasswordInput(!showPasswordInput)}}
                        className="bg-blue-500 px-1 hover:bg-blue-400 cursor-pointer"
                    > 
                        {showPasswordInput ? "Cancel" : "Requires Password?"}
                    </button>

                    {showPasswordInput && (
                        <div className="flex gap-2 items-center">
                            <label htmlFor="password"> Password</label>
                            <input required type="password" placeholder="Type your password here" name="password" id="password" className="border border-gray-300 rounded"/>
                            
                        </div>
                    )}

                    <button 
                        onClick={()=>{setShowExpirationTimeInput(!showExpirationTimeInput)}}
                        className="bg-blue-500 px-1 hover:bg-blue-400 cursor-pointer"
                    > 
                        {showExpirationTimeInput ? "Cancel" : "Requires Expiration Time?"}
                    </button>

                    {showExpirationTimeInput && (
                        <div className="flex gap-2 items-center">
                            <label>Expiration Time</label>
                            <input required type="number" name="expiration_time_amount" placeholder="Number of units" className="border border-gray-300 rounded"/>
                            <select name="unit">
                                <option value="m">Minutes</option>
                                <option value="h">Hours</option>
                                <option value="d">Days</option>
                                <option value="s">Seconds</option>
                            </select>
                        </div>
                    )}
                    <div className="flex gap-2 items-center">
                        <label htmlFor="expires_when_opened"> Expires when opened</label>
                        <input required type="checkbox" name="expires_when_opened" id="expires_when_opened" />
                    </div>
                </form>
            </div>
        </div>
    )
}