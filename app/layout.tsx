import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Velocity - Marketing Asset Management at Your Fingertips",
  description: "Velocity helps marketing teams easily store, organize, and access valuable assets from anywhere. Streamline your marketing workflow today.",
  keywords: ["marketing assets", "asset management", "marketing tools", "digital assets", "marketing workflow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} font-body bg-body text-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
