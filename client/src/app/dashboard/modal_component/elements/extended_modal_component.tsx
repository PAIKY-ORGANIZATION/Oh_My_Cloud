"use client"

type ExtendedModalProps = {
    fileId: string
    setShowPasswordInput: (showPasswordInput: boolean) => void
    showPasswordInput: boolean
    setShowExpirationTimeInput: (showExpirationTimeInput: boolean) => void
    showExpirationTimeInput: boolean
    createShareableFileAccess: (e: React.FormEvent<HTMLFormElement>) => void
    setShareModalOpen: (shareModalOpen: boolean) => void
}

export default function ExtendedModal(props: ExtendedModalProps) {
    const {
        fileId,
        setShowPasswordInput,
        showPasswordInput,
        setShowExpirationTimeInput,
        showExpirationTimeInput,
        createShareableFileAccess,
        setShareModalOpen,
    } = props

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
                <div className="space-y-2">
 
                    <h2 className="text-xl font-semibold">Create a secure link</h2>
                    <p className="text-sm text-zinc-400">
                        Configure optional protections for file <span className="font-medium text-zinc-200">{fileId}</span>.
                    </p>
                </div>

                <form onSubmit={createShareableFileAccess} className="mt-6 flex flex-col gap-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold">Password protection</p>
                                <p className="text-xs text-zinc-400">Require a password to access the link.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowPasswordInput(!showPasswordInput)
                                }}
                                className="inline-flex h-9 items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                                type="button"
                            >
                                {showPasswordInput ? "Remove password" : "Add password"}
                            </button>
                        </div>

                        {showPasswordInput && (
                            <div className="mt-4 grid gap-2">
                                <label htmlFor="password" className="text-xs font-medium text-zinc-300">
                                    Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    placeholder="Type your password here"
                                    name="password"
                                    id="password"
                                    className="h-10 rounded-full border border-zinc-700 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none transition focus:border-emerald-400/70"
                                />
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold">Expiration timer</p>
                                <p className="text-xs text-zinc-400">Auto-revoke access after a set duration.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowExpirationTimeInput(!showExpirationTimeInput)
                                }}
                                className="inline-flex h-9 items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                                type="button"
                            >
                                {showExpirationTimeInput ? "Remove timer" : "Add timer"}
                            </button>
                        </div>

                        {showExpirationTimeInput && (
                            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_140px]">
                                <div className="grid gap-2">
                                    <label className="text-xs font-medium text-zinc-300">Expiration time</label>
                                    <input
                                        required
                                        type="number"
                                        name="expiration_time_amount"
                                        placeholder="Number of units"
                                        defaultValue={1}
                                        className="h-10 rounded-full border border-zinc-700 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none transition focus:border-emerald-400/70"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-xs font-medium text-zinc-300">Unit</label>
                                    <select
                                        name="unit"
                                        className="h-10 rounded-full border border-zinc-700 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none transition focus:border-emerald-400/70"
                                    >
                                        <option value="m">Minutes</option>
                                        <option value="h">Hours</option>
                                        <option value="d">Days</option>
                                        <option value="s">Seconds</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <label className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm font-medium text-zinc-200">
                        Expires when opened
                        <input
                            type="checkbox"
                            name="expires_when_opened"
                            id="expires_when_opened"
                            className="h-4 w-4 rounded border-zinc-600 bg-zinc-950 text-emerald-400 focus:ring-emerald-400/60"
                        />
                    </label>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            onClick={() => {
                                setShareModalOpen(false)
                            }}
                            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-5 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-400 px-5 text-xs font-semibold text-zinc-900 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                        >
                            Create shareable link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
