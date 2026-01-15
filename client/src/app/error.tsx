
//- NextJS by default uses "error.tsx" for unexpected errors
//$ However, it only works for client side errors. So it will not work if you, for example, throw an error from the middleware.

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnexpectedErrorPage() {
  const router = useRouter();

  return (
    <main className="flex-1 grid place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-fuchsia-400/20 text-white font-semibold">
            !
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-white">
              Unexpected error occurred
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Something went wrong. Try again or go home.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">

          <Link
            href="/"
            className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}