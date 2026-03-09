import type { ReactNode } from "react";
import "../globals.css";
import { inter, notoSansThai } from "@/lib/fonts";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "BOI Admin - Template Management",
  description: "BOI Website Administration Panel",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={`${inter.variable} ${notoSansThai.variable}`}>
      <head>
        {/* Google Fonts for template previews */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-admin="" className="min-h-screen antialiased font-sans">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
