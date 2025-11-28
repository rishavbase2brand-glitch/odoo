"use client";

export default function AboutBanner() {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 relative">

      {/* Back Button */}
      <button className="absolute top-6 left-6 flex items-center gap-2 text-xs tracking-[0.15em] text-black">
        <span className="block w-6 h-[1px] bg-black"></span>
        ZURÜCK
      </button>

      {/* Top Label */}
      <p className="text-[11px] tracking-[0.25em] text-gray-500 mb-4">
        ÜBER UNS
      </p>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-light text-black mb-6">
        Bureau Kersten
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-600 max-w-3xl">
        Diskreter Vermittler zwischen belgischen Innendesign-Marken und
        Schweizer Architekten.
      </p>
    </section>
  );
}
