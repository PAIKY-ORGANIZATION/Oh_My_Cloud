import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppError, toAppError } from "../lib/http/app_error";
import { unexpected_error_path } from "../lib/app_paths";
import { toast } from "react-toast";

export function handleFrontendHttpError (e: Error, router: AppRouterInstance) {
    console.log(e)
    
    const err: AppError = toAppError(e as Error)
    
    
    if (err.kind == "network" || err.kind == "unknown"){
        router.push(unexpected_error_path + "/" + err.message); return
    }
    toast.error(err.message)
}