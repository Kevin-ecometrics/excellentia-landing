import type { Metadata } from "next";
import NotFoundContent from "@/app/components/not-found-content";
import { fontVariables } from "@/app/fonts";
import { getDictionary } from "@/app/i18n";
import "./globals.css";

// Con dos root layouts ((en) y (es)) no hay un layout unico desde el cual
// componer el 404 global, asi que Next exige este archivo. Devuelve el
// documento HTML completo y usa el idioma por defecto.
export const metadata: Metadata = {
  title: "404 | Excellentia Foods LLC",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white">
        <div className="flex flex-1 flex-col bg-white">
          <NotFoundContent locale="en" dict={getDictionary("en")} />
        </div>
      </body>
    </html>
  );
}
