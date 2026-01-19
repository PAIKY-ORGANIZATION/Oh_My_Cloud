"use client"

import { downloadFilePath } from "@/src/lib/server_paths"
import { filesize } from "filesize"
import ShareFileModal from "../../modal_component/share_file_modal"
import { UserFile } from "@/src/http_services/files/get_user_file_list_service"
import { Dispatch, SetStateAction } from "react"

type ExtendedDashboardProps = {
    userFiles: UserFile []
    setShareModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedFileId: Dispatch<SetStateAction<string | null>>
    uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void
    deleteFile: (fileId: string) => void
    shareModalOpen: boolean
    selectedFileId: string | null
}

export default function ExtendedDashboard(props: ExtendedDashboardProps) {
    const {
        userFiles,
        setShareModalOpen,
        setSelectedFileId,
        uploadFile,
        deleteFile,
        shareModalOpen,
        selectedFileId,
    } = props

    const totalSize = userFiles.reduce((total, file) => total + file.original_file_size, 0)
    const hasFiles = userFiles.length > 0

    return (
        <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 dark:bg-black dark:text-zinc-100">
            {shareModalOpen && selectedFileId ? (
                <ShareFileModal fileId={selectedFileId} setShareModalOpen={setShareModalOpen} />
            ) : null}

            <div className="mx-auto w-full max-w-6xl space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Your secure vault
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                            Manage uploads, share links, and keep your files organized.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <label
                            htmlFor="upload-file"
                            className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-xs font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            Upload new file
                        </label>
                        <input
                            onChange={uploadFile}
                            id="upload-file"
                            type="file"
                            multiple
                            hidden
                        />

                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Total files
                        </p>
                        <p className="mt-2 text-2xl font-semibold">{userFiles.length}</p>
                    </div>
                    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Storage used
                        </p>
                        <p className="mt-2 text-2xl font-semibold">{filesize(totalSize)}</p>
                    </div>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Your files</h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                Download, share, or delete any file in your vault.
                            </p>
                        </div>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            {hasFiles ? "Sorted by newest upload" : "No files yet"}
                        </span>
                    </div>

                    <div className="mt-6 space-y-4">
                        {!hasFiles ? (
                            <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                                Upload your first file to start sharing secure links.
                            </div>
                        ) : (
                            userFiles.map((userFile) => (
                                <div
                                    key={userFile.id}
                                    className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold">{userFile.original_file_name}</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {filesize(userFile.original_file_size)} • ID: {userFile.id}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <a
                                            download={userFile.original_file_name}
                                            href={
                                                process.env.NEXT_PUBLIC_REMOTE_BACKEND_URL +
                                                downloadFilePath +
                                                "/" +
                                                userFile.id
                                            }
                                            className="inline-flex h-9 items-center rounded-full border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:text-white"
                                        >
                                            Download
                                        </a>
                                        <button
                                            className="inline-flex h-9 items-center rounded-full border border-emerald-200 bg-emerald-500/10 px-4 text-xs font-semibold text-emerald-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-500/20 dark:border-emerald-400/40 dark:text-emerald-300"
                                            onClick={() => {
                                                setShareModalOpen(true)
                                                setSelectedFileId(userFile.id)
                                            }}
                                        >
                                            Share
                                        </button>
                                        <button
                                            className="inline-flex h-9 items-center rounded-full border border-red-200 bg-red-500/10 px-4 text-xs font-semibold text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-500/20 dark:border-red-400/40 dark:text-red-300"
                                            onClick={() => {
                                                deleteFile(userFile.id)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
