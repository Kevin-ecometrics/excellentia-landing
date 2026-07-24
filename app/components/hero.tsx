import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-[60vh] w-full items-end justify-start overflow-hidden bg-default-teal px-6 pb-10 sm:px-10 sm:pb-14 lg:h-[70vh] lg:px-16 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/logos/V1/LOGO 1 EXCELLENTIA.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          priority
          className="h-auto w-64 object-contain sm:w-112 lg:w-144"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative max-w-2xl">
        <h1 className="font-support1 text-2xl text-default-ivory drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:text-3xl lg:text-4xl">
          Excellentia Foods: The Bridge to Authentic Hispanic Flavors in
          Southern California
        </h1>
        <p className="mt-4 font-support2 text-base text-default-ivory/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-lg">
          Wholesale Hispanic Food Distributor: Premium Cheeses, Cold Cuts, & DSD
          Merchandising Streamline your dairy and deli aisles with Excellentia
          Foods
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 font-support2 text-default-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-all hover:gap-3"
        >
          Join Today
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
