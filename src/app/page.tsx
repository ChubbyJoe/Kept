export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Kept
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Your medication routine, kept simple.
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          The application foundation is ready. Medication setup, reminders, and
          adherence history will arrive in the next product slices.
        </p>
      </section>
    </main>
  );
}
