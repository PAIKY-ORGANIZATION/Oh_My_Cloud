
//- NextJS by default uses "error.tsx" for unexpected errors
//$ However, it only works for client side errors. So it will not work if you, for example, throw an error from the middleware.


import Link from "next/link";

type Params = {
    params: Promise<{error_message: string}>
}

export default async function UnexpectedErrorPage({params}: Params) {
  const {error_message} = await params

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Unexpected server error
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 wrap-break-word">
              {decodeURIComponent(error_message)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}