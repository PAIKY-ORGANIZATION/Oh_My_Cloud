// prettier-ignore
export const FormItem = ({name, type, label}: {name: string, type: string, label: string}) =>{
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-center"> {label}</label>
            <input id={name} name={name} type={type} placeholder={`Type your ${name} here`} />
        </div>
    )
}

type handleSubmitFunction = (e: React.FormEvent<HTMLFormElement>) => void;

// prettier-ignore
export const UserForm = ({children, handleSubmit}: {children: React.ReactNode, handleSubmit: handleSubmitFunction}) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        //$ For pressing enter to submit the form
        if (e.key === "Enter") handleSubmit(e)
    }
    
    return (
        <form 
            className="flex flex-col gap-4 border-blue-500 border p-2" 
            onSubmit={handleSubmit} 
            onKeyDown={handleKeyDown}
        >
            {children}
        </form>
    )
}
