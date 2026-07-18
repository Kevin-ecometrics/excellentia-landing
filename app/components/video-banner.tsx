export default function VideoBanner() {
  return (
    <section className="relative flex h-[50vh] w-full items-end overflow-hidden bg-default-teal px-6 pb-10 sm:h-[40vh] sm:items-center sm:pb-0">
      {/* Background video placeholder — swap this section's bg-default-rust
          for an absolutely positioned <video> once the asset is available. */}
      <div className="relative max-w-lg text-left text-white">
        <h2 className="font-support2 text-2xl font-bold sm:text-3xl">
          Freshness Delivered, Every Time
        </h2>
        <p className="mt-4 font-support2 text-base">
          From our warehouse to your shelves, we handle the cold chain with
          care.
        </p>
        <p className="mt-2 font-support2 text-base">
          Serving retailers across Southern California with dependable DSD
          service.
        </p>
      </div>
    </section>
  );
}
