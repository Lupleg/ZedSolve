"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Search, 
  Upload, 
  BookOpen, 
  FileText, 
  PenTool, 
  Trophy,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">ZedSolve</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/documents?type=assignment"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        <PenTool className="h-4 w-4 mb-2" />
                        Assignments
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Homework and project solutions
                      </div>
                    </Link>
                    <Link
                      href="/documents?type=exam"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        <FileText className="h-4 w-4 mb-2" />
                        Exams & Quizzes
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Past papers and practice tests
                      </div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/documents" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                All Documents
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/universities" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Universities
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documents, courses, universities..."
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {isSignedIn ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/documents" 
                  className="flex items-center space-x-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  <span>All Documents</span>
                </Link>
                <Link 
                  href="/documents?type=assignment" 
                  className="flex items-center space-x-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PenTool className="h-5 w-5" />
                  <span>Assignments</span>
                </Link>
                <Link 
                  href="/documents?type=exam" 
                  className="flex items-center space-x-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Trophy className="h-5 w-5" />
                  <span>Exams & Quizzes</span>
                </Link>
                <Link 
                  href="/universities" 
                  className="flex items-center space-x-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Universities</span>
                </Link>
                {isSignedIn && (
                  <Link 
                    href="/upload" 
                    className="flex items-center space-x-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Document</span>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
