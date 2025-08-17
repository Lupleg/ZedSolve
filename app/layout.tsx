import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexProvider } from "./convex-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZedSolve - Software Engineering Solutions Hub",
  description: "A comprehensive platform for hosting and sharing solutions to university software engineering challenges, assignments, and tutorial sheets.",
  keywords: "software engineering, programming, solutions, tutorials, assignments, challenges, university, computer science",
  authors: [{ name: "ZedSolve Team" }],
  openGraph: {
    title: "ZedSolve - Software Engineering Solutions Hub",
    description: "Access comprehensive solutions, tutorials, and assignments for software engineering students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexProvider>
          {children}
        </ConvexProvider>
      </body>
    </html>
  );
}
