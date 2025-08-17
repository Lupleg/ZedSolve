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
  X,
  ChevronDown,
  Globe,
  Home,
  Library,
  StickyNote,
  Bot,
  Clock,
  FolderOpen,
  Users,
  User,
  Plus,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/75">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-9 w-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              ZedSolve
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  University
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/50 rounded-xl p-2">
                <DropdownMenuItem asChild>
                  <Link
                    href="/universities"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span>All Universities</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/documents?category=computer-science"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <div className="h-4 w-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm"></div>
                    <span>Computer Science</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/documents?category=business"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <div className="h-4 w-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-sm"></div>
                    <span>Business</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/documents?category=engineering"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <div className="h-4 w-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-sm"></div>
                    <span>Engineering</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  High School
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/50 rounded-xl p-2">
                <DropdownMenuItem asChild>
                  <Link
                    href="/documents?level=high-school"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>All High School</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/documents?type=assignment&level=high-school"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <PenTool className="h-4 w-4 text-indigo-600" />
                    <span>Assignments</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/documents?type=exam&level=high-school"
                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span>Exams & Tests</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/documents"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition-all duration-200"
            >
              Browse
            </Link>
          </nav>

          {/* Search Bar - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents, courses..."
                className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Upload Button - Only when signed in */}
            {isSignedIn && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:flex border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Link>
              </Button>
            )}

            {/* Authentication */}
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 rounded-lg",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Sign in
                </Button>
              </SignInButton>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] bg-white/95 backdrop-blur-md border-l border-gray-200/50"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="/universities"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="font-medium">Universities</span>
                    </Link>
                    <Link
                      href="/documents"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">All Documents</span>
                    </Link>
                    <Link
                      href="/documents?type=assignment"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PenTool className="h-5 w-5" />
                      <span className="font-medium">Assignments</span>
                    </Link>
                    <Link
                      href="/documents?type=exam"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Trophy className="h-5 w-5" />
                      <span className="font-medium">Exams & Quizzes</span>
                    </Link>
                    {isSignedIn && (
                      <Link
                        href="/upload"
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Upload className="h-5 w-5" />
                        <span className="font-medium">Upload Document</span>
                      </Link>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
