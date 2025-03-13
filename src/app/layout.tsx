import "@/styles/globals.css";
import type { Metadata } from "next";
import Background from "@/components/background";
import Footer from "@/components/footer";
import localFont from "next/font/local";

const fontText = localFont({
  src: "../styles/fonts/Font-Text-400-Trial.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Threes blog",
  description: "Learning, crafting, and sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontText.className}`}>
        <Background />

        <main className="container max-w-3xl mx-auto min-h-[calc(100vh-73px)] py-16 md:py-32 px-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
