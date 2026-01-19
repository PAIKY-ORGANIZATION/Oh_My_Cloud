"use client"

type ExtendedUnlockShareableFileAccessElementProps = {
    downloadFile: (e: React.FormEvent<HTMLFormElement>) => void
    shareableFileAccessId: string
}

export default function ExtendedUnlockShareableFileAccessElement(
    props: ExtendedUnlockShareableFileAccessElementProps
) {
    const {downloadFile, shareableFileAccessId} = props

    return (
        <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-100">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Secure link access
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Enter the password to unlock this file
                    </h1>
                    <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
                        This file is protected with a one-time shareable link. Provide the
                        password to verify access and start the download.
                    </p>
                </div>

                <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            Access ID
                        </span>
                        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                            {shareableFileAccessId}
                        </span>
                    </div>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={downloadFile}
                    >
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
                        >
                            Shareable link password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Type the password"
                            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            Verify and download
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                    Links expire automatically after the configured time window.
                </p>
            </div>
        </div>
    )
}
