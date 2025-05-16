"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { CssBaseline } from "@mui/material";
import Providing from "./resolver";
import Navnew from "./layout/navbars";
import Footer from "./layout/footer";

const ClientLayout = ({ children }) => {
    return (
        <ClerkProvider>
            <Providing>
                <CssBaseline />
                <header className="sticky top-0 z-50 w-full bg-inherit shadow-sm">
                    <Navnew />
                </header>
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
                <Footer />
            </Providing>
        </ClerkProvider>
    );
};

export default ClientLayout;