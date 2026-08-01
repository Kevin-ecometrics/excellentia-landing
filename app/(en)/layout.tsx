import RootShell, { rootMetadata } from "@/app/root-shell";

export const metadata = rootMetadata("en");

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="en">{children}</RootShell>;
}
