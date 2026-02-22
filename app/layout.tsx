import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediVox Ai",
  description: "The secure, AI-powered voice assistant for healthcare. MediVox AI captures patient data, assists in real-time diagnosis, and streamlines clinical workflows with enterprise-grade security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.variable} antialiased`}>
          <Provider>
            {children}

            <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
