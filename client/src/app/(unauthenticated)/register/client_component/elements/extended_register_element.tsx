import { FormItem, UserForm } from "@/src/components/shared_components/user_form/extended_user_form_element"
import { login_path } from "@/src/lib/app_paths"
import Link from "next/link"

type ExtendedRegisterProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    USERNAME_DEFAULT_VALUE: string
    EMAIL_DEFAULT_VALUE: string
    PASSWORD_DEFAULT_VALUE: string
    generateSafePassword: () => void
}

export default function ExtendedRegister(props: ExtendedRegisterProps) {
    const {
        handleSubmit,
        USERNAME_DEFAULT_VALUE,
        EMAIL_DEFAULT_VALUE,
        PASSWORD_DEFAULT_VALUE,
        generateSafePassword,
    } = props

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-100">
            <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 space-y-2 text-center">
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Create your vault
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Get started</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        Create a secure account in seconds.
                    </p>
                </div>

                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="username" type="text" label="Username" defaultValue={USERNAME_DEFAULT_VALUE} />
                    <FormItem name="email" type="email" label="Email" defaultValue={EMAIL_DEFAULT_VALUE} />
                    <FormItem name="password" type="password" label="Password" defaultValue={PASSWORD_DEFAULT_VALUE} />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <FormItem
                                name="confirm_password"
                                type="password"
                                label="Confirm password"
                                defaultValue={PASSWORD_DEFAULT_VALUE}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={generateSafePassword}
                            className="h-11 rounded-full border border-zinc-200 bg-white px-5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:text-white"
                        >
                            Autogenerate safe password
                        </button>
                    </div>
                </UserForm>

                <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
                    Already have an account?{" "}
                    <Link
                        href={login_path}
                        className="font-semibold text-zinc-900 transition hover:text-zinc-700 dark:text-white dark:hover:text-zinc-200"
                    >
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}