import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./providers";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Now Playing - Guide",
	description: "What Guide is currently listening to on Spotify",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={jetBrainsMono.className}>
				<ClientProviders>
					<main>{children}</main>
				</ClientProviders>
			</body>
		</html>
	);
}
