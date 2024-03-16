import React from "react";
import ClientLayout from "./ClientLayout";
import {Inter} from "next/font/google";
import "./globals.css";
import AppProvider from "./AppProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
	title: "Suk-Bederete",
	description: "ecommerce application",
};

export default function RootLayout({children}) {
	return (
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<body className={inter.className}>
				<AppProvider>
					<div className=" flex flex-col w-full min-h-screen">
						<div id="page-transition"></div>

						<ClientLayout>{children}</ClientLayout>
					</div>
				</AppProvider>
			</body>
		</html>
	);
}
