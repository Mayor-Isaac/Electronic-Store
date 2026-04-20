import React from "react";
import { SparkleIcon, BellRingingIcon, ClockCountdownIcon } from "@phosphor-icons/react";

export default function ComingSoon() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-amber-50 to-white p-6 shadow-lg md:p-10">
      <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-orange-200/45 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
          <SparkleIcon size={16} weight="fill" />
          New Experience in Progress
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Something amazing is
          <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500 bg-clip-text text-transparent">
            launching soon
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-base text-zinc-600 sm:text-lg">
          We are crafting a faster and smarter feature for your workflow. Join
          the waitlist and be the first to try it as soon as it goes live.
        </p>

        <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-3 shadow-sm backdrop-blur sm:flex-row sm:p-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none ring-0 transition focus:border-emerald-500"
          />
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 sm:w-auto"
          >
            <BellRingingIcon size={18} weight="bold" />
            Notify Me
          </button>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
          <ClockCountdownIcon size={16} weight="duotone" />
          Early access opens very soon
        </div>
      </div>
    </section>
  );
}
