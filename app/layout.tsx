// /app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

const brushstrike = localFont({
  src: "./fonts/BRUSHSTRIKE.woff2",
  variable: "--font-brushstrike",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fear-Not Lifestyle",
  description: "Clothing Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${raleway.variable} ${brushstrike.variable} antialiased`}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000000",
                color: "#fff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
