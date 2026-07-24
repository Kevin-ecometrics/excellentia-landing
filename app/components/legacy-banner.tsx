export default function LegacyBanner() {
  return (
    <section className="relative flex h-[65vh] w-full items-end justify-start overflow-hidden bg-default-indigo px-6 pb-10 sm:h-[75vh] sm:px-10 sm:pb-14 lg:h-[85vh] lg:px-16 lg:pb-16">
      {/* Background video placeholder — swap this section's bg-default-indigo
          for an absolutely positioned <video> once the asset is available. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative max-w-2xl text-left">
        <h2 className="font-support2 text-2xl font-bold text-default-ivory sm:text-3xl">
          Excellentia Foods is a family-owned business with a decade of
          growth; with every delivery, we fulfill our promise of excellence,
          quality, and freshness.
        </h2>
        <p className="mt-4 font-support2 text-base text-default-ivory/80">
          We are committed to providing every customer and the community with
          products that connect them to their Hispanic roots.
        </p>
      </div>
    </section>
  );
}
