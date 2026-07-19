import {
  ClerkProvider,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Stack",
  description: "A great tool to track students' work",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen w-full bg-brand-100 bg-[linear-gradient(to_right,#7f56d91f_1px,transparent_1px),linear-gradient(to_bottom,#7f56d91f_1px,transparent_1px)] bg-size-[40px_40px] min-h-full flex flex-col p-2">
        <ClerkProvider
          appearance={{
            options: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
          }}
        >
          <div className="flex min-h-full flex-col">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}