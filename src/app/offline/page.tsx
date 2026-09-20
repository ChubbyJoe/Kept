export default function OfflinePage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Kept
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          You are offline
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Reconnect to verify your session. Kept keeps private health details
          hidden while your account cannot be verified.
        </p>
      </section>
    </main>
  );
}
