import { FormItem, UserForm } from "@/src/components/shared_components/user_form/extended_user_form_element"
import { register_path } from "@/src/lib/app_paths"
import Link from "next/link"

type ExtendedLoginProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    EMAIL_DEFAULT_VALUE: string
    PASSWORD_DEFAULT_VALUE: string
}

export default function ExtendedLogin(props: ExtendedLoginProps) {
    const {handleSubmit, EMAIL_DEFAULT_VALUE, PASSWORD_DEFAULT_VALUE} = props

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-100">
            <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 space-y-2 text-center">
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Secure access
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        Sign in to manage your encrypted files.
                    </p>
                </div>

                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="email" type="email" label="Email" defaultValue={EMAIL_DEFAULT_VALUE} />
                    <FormItem name="password" type="password" label="Password" defaultValue={PASSWORD_DEFAULT_VALUE} />
                </UserForm>

                <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
                    Don&apos;t have an account?{" "}
                    <Link
                        href={register_path}
                        className="font-semibold text-zinc-900 transition hover:text-zinc-700 dark:text-white dark:hover:text-zinc-200"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}
