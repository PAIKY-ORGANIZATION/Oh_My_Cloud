"use client"

import { FormItem } from "@/src/components/shared_components/user_form/simple_user_form_element"
import { UserForm } from "@/src/components/shared_components/user_form/simple_user_form_element"
import { login_path } from "@/src/lib/app_paths"
import Link from "next/link"

type SimpleRegisterProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    USERNAME_DEFAULT_VALUE: string
    EMAIL_DEFAULT_VALUE: string
    PASSWORD_DEFAULT_VALUE: string
    generateSafePassword: () => void
}
export default function  SimpleRegister(props: SimpleRegisterProps) {
    const {handleSubmit, USERNAME_DEFAULT_VALUE, EMAIL_DEFAULT_VALUE, PASSWORD_DEFAULT_VALUE, generateSafePassword} = props

    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div className="border border-green-500 p-1 w-[500px]">
                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="username" type="text" label="Username" defaultValue={USERNAME_DEFAULT_VALUE}></FormItem>
                    <FormItem name="email" type="email" label="Email" defaultValue={EMAIL_DEFAULT_VALUE}></FormItem>
                    <FormItem name="password" type="password" label="Password" defaultValue={PASSWORD_DEFAULT_VALUE}></FormItem>
                    <div className="flex gap-2 items-center">
                        <FormItem name="confirm_password" type="password" label="ConfirmPassword" defaultValue={PASSWORD_DEFAULT_VALUE}/>
                        <button type="button" onClick={generateSafePassword} className="bg-blue-500 cursor-pointer">
                            Autogenerate Safe Password
                        </button>
                    </div>
                </UserForm>
                <Link href={login_path}>
                    <p> Already have an account? <span className="text-blue-500 hover:underline"> Login</span> </p>
                </Link>
            </div>
        </div>
    )
}