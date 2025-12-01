import type { Metadata } from "next";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/footer";
export const metadata: Metadata = {
  title: "My App",
  description: "Learning Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
