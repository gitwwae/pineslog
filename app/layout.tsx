import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: { default: "pineslog · road to $1M", template: "%s · pineslog" },
  description: "Field notes on the road to $1M. Building AI in the open.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://pineslog.com"),
  openGraph: {
    type: "website",
    title: "pineslog · road to $1M",
    description: "Field notes on the road to $1M. Building AI in the open.",
    url: "/",
    siteName: "pineslog"
  },
  twitter: { card: "summary_large_image", title: "pineslog · road to $1M" }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = !!user;

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav isAdmin={isAdmin} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
