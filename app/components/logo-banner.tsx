import Image from "next/image";

export default function LogoBanner() {
  return (
    <section className="relative flex h-[35vh] w-full items-center justify-center overflow-hidden bg-default-teal px-6 sm:h-[40vh] sm:px-10 lg:h-[45vh] lg:px-16">
      <Image
        src="/logos/V1/LOGO 1 EXCELLENTIA.png"
        alt="Excellentia Foods"
        width={400}
        height={400}
        priority
        className="h-auto w-40 object-contain sm:w-56 lg:w-72"
      />
    </section>
  );
}
