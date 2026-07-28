import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col bg-default-teal">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <Image
          src="/logos/V1/LOGO EXCELLENTIA SIN FONDO.png"
          alt="Excellentia Foods logo"
          title="Excellentia Foods – Wholesale Hispanic Food Distributor"
          width={320}
          height={320}
          priority
          className="h-auto w-56 object-contain sm:w-72"
        />
        <h1 className="mt-8 font-main text-8xl font-bold tracking-tight text-default-ivory sm:text-9xl">
          404
        </h1>
        <p className="mt-2 text-lg text-default-ivory/80 sm:text-xl font-support2">
          Page not found
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-default-ivory px-8 py-3 font-support2 text-base font-bold text-default-teal transition-transform hover:scale-105"
        >
          Return to home page
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 px-6 pb-8 text-sm text-default-ivory/70">
        <div className="flex flex-wrap font-support2 justify-center gap-x-4 gap-y-1">
          <a
            href="/terms-and-conditions"
            className="underline-offset-2 hover:underline"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/End-User-Licensing-Agreement"
            className="underline-offset-2 hover:underline"
          >
            EULA
          </a>
          <a
            href="/privacy-policy"
            className="underline-offset-2 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
        <div className="border-t border-default-ivory/20 pt-3 text-center font-support2">
          &copy; {new Date().getFullYear()} Excellentia Foods LLC
        </div>
      </div>
    </main>
  );
}
