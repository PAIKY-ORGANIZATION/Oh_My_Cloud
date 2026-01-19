import type React from "react"

type FormItemProps = {
    name: string
    type: string
    label: string
    defaultValue: string
}

export const FormItem = ({name, type, label, defaultValue}: FormItemProps) =>{
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={`Type your ${name} here`}
                defaultValue={defaultValue}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
            />
        </div>
    )
}

type HandleSubmitFunction = (e: React.FormEvent<HTMLFormElement>) => void;

export const UserForm = ({children, handleSubmit}: {children: React.ReactNode, handleSubmit: HandleSubmitFunction}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        //$ For pressing enter to submit the form
        if (e.key === "Enter") handleSubmit(e)
    }

    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
        >
            {children}
            <button
                type="submit"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                Submit
            </button>
        </form>
    )
}