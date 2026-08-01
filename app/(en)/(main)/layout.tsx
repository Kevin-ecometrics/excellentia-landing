import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { getDictionary } from "@/app/i18n";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = getDictionary("en");

  return (
    <>
      <Navbar locale="en" dict={dict} />
      <div className="flex flex-1 flex-col bg-white">{children}</div>
      <Footer locale="en" dict={dict} />
    </>
  );
}
