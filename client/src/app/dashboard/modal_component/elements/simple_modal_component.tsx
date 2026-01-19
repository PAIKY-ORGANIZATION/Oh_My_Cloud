"use client"

type SimpleModalProps = {
    fileId: string
    setShowPasswordInput: (showPasswordInput: boolean) => void
    showPasswordInput: boolean
    setShowExpirationTimeInput: (showExpirationTimeInput: boolean) => void
    showExpirationTimeInput: boolean
    createShareableFileAccess: (e: React.FormEvent<HTMLFormElement>) => void
    setShareModalOpen: (shareModalOpen: boolean) => void
}

export default function  SimpleModal(props: SimpleModalProps) {
    const {fileId, setShowPasswordInput, showPasswordInput, setShowExpirationTimeInput, showExpirationTimeInput, createShareableFileAccess, setShareModalOpen} = props

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-[#131313] border border-[#202020] rounded  flex flex-col w-[90vw] max-w-[420px] min-h-[300px] p-2">
                <p>Share File Modal {fileId} </p>
                <form onSubmit={createShareableFileAccess} className="flex flex-col gap-2">
                    <button 
                        onClick={()=>{setShowPasswordInput(!showPasswordInput)}}
                        className="bg-blue-500 px-1 hover:bg-blue-400 cursor-pointer"
                        type="button" //$ For preventing the form from being submitted when the button is clicked
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
                        type="button" //$ For preventing the form from being submitted when the button is clicked
                    > 
                        {showExpirationTimeInput ? "Cancel" : "Requires Expiration Time?"}
                    </button>

                    {showExpirationTimeInput && (
                        <div className="flex gap-2 items-center">
                            <label>Expiration Time</label>
                            <input 
                                required type="number" name="expiration_time_amount" placeholder="Number of units" defaultValue={1} 
                                className="border border-gray-300 rounded"
                            />
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
                        <input type="checkbox" name="expires_when_opened" id="expires_when_opened" />
                    </div>
                    <button type="submit" className="bg-green-600 px-1  cursor-pointer">Create Shareable File Access</button>
                    <button 
                        onClick={()=>{setShareModalOpen(false)}} 
                        className="bg-red-600 px-1  cursor-pointer" 
                        type="button" //$ For preventing the form from being submitted when the button is clicked
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}