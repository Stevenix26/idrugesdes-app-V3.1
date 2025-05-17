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
                <div className="flex flex-col min-h-screen">
                    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
                        <Navnew />
                    </header>
                    <main className="flex-1 w-full mx-auto">
                        {children}
                    </main>
                    <Footer />
                </div>
            </Providing>
        </ClerkProvider>
    );
};

export default ClientLayout;