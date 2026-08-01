import RootShell, { rootMetadata } from "@/app/root-shell";

export const metadata = rootMetadata("es");

export default function EsRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="es">{children}</RootShell>;
}
