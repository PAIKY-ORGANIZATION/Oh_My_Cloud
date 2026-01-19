import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
        <div className="flex flex-col gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Secure file vault for modern teams
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Security for your files
            </h1>
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
              Military-grade encryption, intelligent compression, and resilient cloud
              object storage mean your files are protected, optimized, and always
              available. Share securely with confidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/login"
              className="text-sm font-semibold text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Encrypted by default</h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              Every upload is sealed with military-grade encryption before it
              reaches the vault.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Compression intelligence</h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              Smart compression keeps storage lean without compromising quality
              or security.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Cloud-grade resilience</h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              Built on replicated S3-compatible storage for durable, always-on
              access.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-zinc-200 bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-white shadow-xl dark:border-zinc-800">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Share files anonymously.</h3>
              <p className="mt-2 text-sm text-zinc-200">
                Password-protected access, expiring links, and audit-ready
                visibility are built in.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-md transition hover:-translate-y-0.5 hover:bg-zinc-200"
            >
              Create a secure link
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
