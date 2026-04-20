import React from "react";
import { SparkleIcon, BellRingingIcon, ClockCountdownIcon } from "@phosphor-icons/react";

export default function ComingSoon() {
  return (
    <section className="flex-1 flex items-center justify-center">

      <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
          <SparkleIcon size={16} weight="fill" />
          New Experience in Progress
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Something amazing is
          <span className="block mt-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500 bg-clip-text text-transparent">
            launching soon
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-base text-zinc-600 sm:text-lg">
          We are crafting a faster and smarter feature for your workflow. We'll notify you as soon as it goes live.
        </p>
      </div>
    </section>
  );
}
