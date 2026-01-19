"use client"

import { createPortal } from "react-dom"
import Link from "next/link"
import { login_path } from "../../../../lib/app_paths"
import { NavbarProps } from "./simple_navbar_element"




export default function  NavbarExtended({
    userSession,
    userName,
    userOptionsOpen,
    setUserOptionsOpen,
    writePasswordModalOpen,
    setWritePasswordModalOpen,
    password,
    setPassword,
    logout,
    deleteAccount,
}: NavbarProps) {

    const deleteAccountModal = writePasswordModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-[420px] rounded-lg border border-white/10 bg-[#131313] p-5 shadow-2xl">
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">Confirm account deletion</p>
                        <p className="text-xs text-white/60">
                            Write your password to delete your account.
                        </p>
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className="h-9 rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/20 focus:bg-black/40"
                    />
                    <div className="flex items-center justify-end gap-2">
                        <button
                            className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
                            onClick={() => {
                                setWritePasswordModalOpen(false)
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-400"
                            onClick={() => {
                                deleteAccount(password)
                            }}
                        >
                            Delete account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null

    return (
        <>
        <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
            <div className="mx-auto flex h-12 w-full items-center justify-between px-6 sm:px-10 lg:px-24">
                <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
                    OhMyCloud
                </Link>
                <div className="relative">
                    {userSession ? (
                        <>
                            <button
                                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                                onClick={() => {
                                    setUserOptionsOpen(!userOptionsOpen)
                                }}
                            >
                                {userName}
                                <span className="text-[10px] text-white/60">▾</span>
                            </button>
                            {userOptionsOpen && (
                                <div className="absolute right-0 mt-2 w-44 rounded-md border border-white/10 bg-[#111111] p-2 shadow-lg">
                                    <button
                                        className="block w-full rounded px-2 py-1.5 text-left text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
                                        onClick={() => {
                                            logout()
                                        }}
                                    >
                                        Logout
                                    </button>
                                    <button
                                        className="mt-1 block w-full rounded px-2 py-1.5 text-left text-xs text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                                        onClick={() => {
                                            setWritePasswordModalOpen(true)
                                        }}
                                    >
                                        Delete account
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            href={login_path}
                            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

        </div>
        {typeof window !== "undefined" && deleteAccountModal
            ? createPortal(deleteAccountModal, document.body)
            : null}
        </>
    )


}