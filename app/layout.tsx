import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexProvider } from "./convex-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZedSolve - Share Your Academic Journey",
  description:
    "A platform for students to share assignments, papers, quizzes and academic solutions",
  keywords:
    "university, students, assignments, papers, quizzes, academic, solutions, study materials",
  authors: [{ name: "ZedSolve Team" }],
  openGraph: {
    title: "ZedSolve - Share Your Academic Journey",
    description:
      "Access and share academic materials, assignments, and solutions with students worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexProvider>
              <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster />
              </div>
            </ConvexProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
