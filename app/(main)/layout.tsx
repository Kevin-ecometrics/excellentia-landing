import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col bg-white">{children}</div>
      <Footer />
    </>
  );
}