export default function Hero() {
  return (
    <section className="relative flex h-[50vh] w-full items-end justify-start overflow-hidden bg-default-rust px-6 pb-10 sm:h-[60vh] sm:pb-14 lg:h-[70vh] lg:pb-16">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="relative max-w-2xl">
        <h1 className="font-main text-2xl text-default-ivory sm:text-3xl lg:text-4xl">
          Excellentia Foods: The Bridge to Authentic Hispanic Flavors in
          Southern California
        </h1>
        <p className="mt-4 font-support2 text-base text-default-ivory/80 sm:text-lg">
          Wholesale Hispanic Food Distributor: Premium Cheeses, Cold Cuts, & DSD
          Merchandising Streamline your dairy and deli aisles with Excellentia
          Foods
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 font-support2 text-default-ivory transition-all hover:gap-3"
        >
          Request Wholesale Catalog & Price List
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
