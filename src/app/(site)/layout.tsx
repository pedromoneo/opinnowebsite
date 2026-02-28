import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClientAuthProvider } from "@/lib/client-auth-context";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClientAuthProvider>
            <Navbar />
            <main className="flex-grow pt-[72px]">
                {children}
            </main>
            <Footer />
        </ClientAuthProvider>
    );
}
