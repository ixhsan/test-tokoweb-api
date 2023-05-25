import { NextAuthProvider } from "./providers";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Toko Web",
  description: "2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={nunito.className}>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
