export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-2 border-t border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:justify-between">
      <span>&copy; {new Date().getFullYear()} Excellentia Foods LLC</span>
      <div className="flex gap-4">
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
    </footer>
  );
}
