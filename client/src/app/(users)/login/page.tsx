
"use client"

import Link from "next/link"

export default function Login() {


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget //$ This is the actual <form> element
        const formData = new FormData(formElement) //$ `new FormData` accepts an `HTMLFormElement` in its constructor.
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        console.log(email, password)
    }

    //$ For pressing enter to submit the form
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") handleSubmit(e)
    }

    return (
        <div className="h-full w-full items-center  border-red-500 border flex justify-center">
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-blue-500 border p-2" onKeyDown={handleKeyDown}>
                    <label htmlFor="email"> Email</label> {/* //$ Yes, this label literally renders "Email" on top of the input field. It's bound to "email" because of "id="email" in the input field, so when you click on the label, the input field gets focused.*/}
                    <input type="email" name="email" id="email" placeholder="Type your email here" ></input>

                    <label htmlFor="password"> Password</label>
                    <input id="password" name="password" type="password" placeholder="Type your password here" ></input>                
                </form>
                <Link href="/register" >
                    <p> Don&apos;t have an account? <span className="text-blue-500 hover:underline"> Sign up</span> </p>
                </Link>
            </div>
        </div>
    )
}