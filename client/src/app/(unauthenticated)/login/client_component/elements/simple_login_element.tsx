"use client"

import { FormItem, UserForm } from "@/src/components/shared_components/user_form/simple_user_form_element"
import { register_path } from "@/src/lib/app_paths"
import Link from "next/link"

type SimpleLoginProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    EMAIL_DEFAULT_VALUE: string
    PASSWORD_DEFAULT_VALUE: string
}


export default function  SimpleLogin(props: SimpleLoginProps) {
    const {handleSubmit, EMAIL_DEFAULT_VALUE, PASSWORD_DEFAULT_VALUE} = props


    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div className="border border-green-500 p-1">
                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="email" type="email" label="Email" defaultValue={EMAIL_DEFAULT_VALUE}></FormItem>
                    <FormItem name="password" type="password" label="Password" defaultValue={PASSWORD_DEFAULT_VALUE}></FormItem>
                </UserForm>
                <Link href={register_path}>
                    <p> Don&apos;t have an account? <span className="text-blue-500 hover:underline"> Sign up</span> </p>
                </Link>
            </div>
        </div>
    )
}