"use client"

type SimpleUnlockShareableFileAccessElementProps = {
    downloadFile: (e: React.FormEvent<HTMLFormElement>) => void
    shareableFileAccessId: string
}

export default function  SimpleUnlockShareableFileAccessElement(props: SimpleUnlockShareableFileAccessElementProps) {
    const {downloadFile, shareableFileAccessId} = props

    return (
        <div className="h-full w-full border border-red-500 flex justify-center items-center">
            <form className="border border-green-500 p-2 flex flex-col gap-2" onSubmit={downloadFile}>
                <label htmlFor="password"> Enter password for shareable file access  with id: {shareableFileAccessId}</label>
                <input type="password" id="password" name="password" placeholder="Type your password here" className="border border-gray-300 rounded "></input>
                <button type="submit" > Verify and download </button>
            </form>
        </div>
    )
}