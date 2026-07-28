"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setPending(true);
      setMessage("");

      const { data } = await axios.post(
        "https://excellentiafoods.com/send-email",
        {
          email,
        },
      );

      console.log(data);

      setMessage("Thank you! We'll contact you soon.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative flex min-h-[60vh] w-full flex-col justify-between gap-16 bg-default-navy px-6 pt-16 text-default-ivory sm:px-10 sm:pt-20 lg:min-h-[70vh] lg:px-16 pb-6"
    >
      <div className="relative flex w-full flex-col items-start gap-8 sm:flex-row sm:justify-between">
        <div className="w-full sm:max-w-lg">
          <h3 className="font-support2 text-2xl font-bold sm:text-3xl">
            Request wholesale catalog and price list!
          </h3>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex items-center gap-4 border-b border-default-ivory/30 pb-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
                className="w-full bg-transparent"
              />

              <button type="submit" disabled={pending}>
                {pending ? "···" : "→"}
              </button>
            </div>

            {message && <p className="mt-2">{message}</p>}
          </form>
        </div>

        <nav className="hidden flex-none flex-col items-end gap-2 font-support2 text-base font-bold sm:flex">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span aria-disabled="true" className="cursor-pointer hover:underline">
            About
          </span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:underline"
          >
            Contact
          </a>
        </nav>
      </div>

      <div className="relative flex w-full flex-col items-start gap-8 sm:flex-row sm:justify-between sm:gap-12">
        <div className="flex flex-col gap-3 font-support2 text-base text-default-ivory/80 sm:max-w-lg sm:text-lg">
          <h4 className="text-xl font-bold text-default-ivory sm:text-2xl">
            Contact Info
          </h4>
          <address className="flex flex-col gap-3 not-italic">
            <div className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-5 w-5 flex-none text-default-ivory"
              >
                <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>
                2323 Avenida Costa Este Suite 100, San Diego, CA 92154, United
                States
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 flex-none text-default-ivory"
              >
                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <a
                href="mailto:contact@excellentiafoods.com"
                className="hover:underline"
              >
                contact@excellentiafoods.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 flex-none text-default-ivory"
              >
                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-3.32a1.5 1.5 0 00-1.06-1.436l-4.319-1.44a1.5 1.5 0 00-1.591.359l-1.005 1.005a11.25 11.25 0 01-6.207-6.207l1.005-1.005a1.5 1.5 0 00.359-1.591l-1.44-4.319A1.5 1.5 0 007.32 2.25H4.5a1.5 1.5 0 00-1.5 1.5v2.25z" />
              </svg>
              <a href="tel:+16196216337" className="hover:underline">
                +1 619 621 6337
              </a>
            </div>
          </address>
        </div>

        <div className="w-full flex-1 overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1785182700807!6m8!1m7!1sb9z-f65QTxOvLjI1RRgLFg!2m2!1d32.55503864185368!2d-116.9524382733506!3f240.81628!4f0!5f0.7820865974627469"
            className="h-[300px] w-full sm:h-[350px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Excellentia Foods location"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image
          src="/logos/LOGO LETRAS EXCELLENTIA.png"
          alt="Excellentia Foods"
          width={400}
          height={400}
          className="h-auto w-full object-contain max-w-7xl"
        />
      </div>

      <div className="relative flex w-full flex-col gap-2 text-sm text-default-ivory/70">
        <div className="flex w-full justify-between sm:hidden">
          <nav className="flex flex-col items-start gap-2 font-support2 text-base font-bold text-default-ivory">
            <a href="/" className="hover:underline">
              Home
            </a>
            <span
              aria-disabled="true"
              className="cursor-pointer hover:underline"
            >
              About
            </span>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
          <div className="flex flex-col items-start gap-2">
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
              End-User Licensing Agreement
            </a>
            <a
              href="/privacy-policy"
              className="underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="hidden justify-start gap-4 sm:flex">
          <a
            href="/terms-and-conditions/"
            className="underline-offset-2 hover:underline"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/End-User-Licensing-Agreement/"
            className="underline-offset-2 hover:underline"
          >
            End-User Licensing Agreement
          </a>
          <a
            href="/privacy-policy/"
            className="underline-offset-2 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
        <div className="border-t border-default-ivory/20 pt-2 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Excellentia Foods LLC</span>
        </div>
      </div>
    </footer>
  );
}
