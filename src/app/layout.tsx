import "./globals.css";
import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import Background from "@/components/background";
import Footer from "@/components/footer";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const firaCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
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
			<body className={`${inter.variable} ${firaCode.variable}`}>
				<Background />

				<main className="container max-w-3xl mx-auto min-h-[calc(100vh-73px)] py-16 md:py-32 px-5">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
