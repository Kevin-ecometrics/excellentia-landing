import Image from "next/image";

export default function LogoBanner() {
  return (
    <section className="relative flex h-[35vh] w-full items-center justify-center overflow-hidden bg-default-teal px-6 sm:h-[40vh] sm:px-10 lg:h-[45vh] lg:px-16">
      <Image
        src="/logos/V1/LOGO EXCELLENTIA SIN FONDO.png"
        alt="Excellentia Foods logo"
        title="Excellentia Foods – Wholesale Hispanic Food Distributor"
        width={400}
        height={400}
        priority
        className="h-auto w-62 object-contain sm:w-72 lg:w-96"
      />
    </section>
  );
}
