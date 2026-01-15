
"use client"

import { FormItem, UserForm } from "@/src/context/user_form"
import Link from "next/link"

export default function Register() {


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.
 
 
        //? Validate form data with Zod
        const username = formData.get('username') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        
        console.log(email, password, username)
    }

    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div className="border border-green-500 p-1">
                <UserForm handleSubmit={handleSubmit}>
                    <FormItem name="username" type="text" label="Username"></FormItem>
                    <FormItem name="email" type="email" label="Email"></FormItem>
                    <FormItem name="password" type="password" label="Password"></FormItem>
                </UserForm>
                <Link href="/register">
                    <p> Don&apos;t have an account? <span className="text-blue-500 hover:underline"> Sign up</span> </p>
                </Link>
            </div>
        </div>
    )
}