import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins" });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "Opinno - Global Innovation Consultancy",
  description: "WE DELIVER IMPACT THROUGH INNOVATION. Opinno is a global innovation consultancy. We transform organizations using methodologies invented by entrepreneurs.",
  keywords: "innovation, consultancy, open innovation, corporate transformation, venture building, technology solutions",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Opinno - Global Innovation Consultancy",
    description: "WE DELIVER IMPACT THROUGH INNOVATION. Opinno is a global innovation consultancy.",
    type: "website",
    url: "https://opinno.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${roboto.variable} font-sans bg-white text-opinno-primary antialiased selection:bg-opinno-accent selection:text-white flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
