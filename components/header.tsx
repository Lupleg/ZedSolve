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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full md:hidden bg-[#4A1D4E] text-white">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Hamburger Menu */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] bg-white border-r border-gray-200 p-0"
            >
              <div className="flex flex-col h-full">
                {/* Welcome Header */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to ZedSolve
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign in to access study resources
                  </p>

                  {/* Auth Buttons - Only show if not signed in */}
                  {!isSignedIn && (
                    <div className="flex space-x-2 mb-6">
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Sign in
                        </Button>
                      </SignInButton>
                      <SignInButton mode="modal">
                        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                          Register
                        </Button>
                      </SignInButton>
                    </div>
                  )}

                  {/* User Profile Section */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {isSignedIn ? (
                        <UserButton
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "h-12 w-12",
                            },
                          }}
                        />
                      ) : (
                        <User className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-600">
                        {isSignedIn ? user?.firstName || "User" : "Guest user"}
                      </h3>
                      <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                        + Add your university or school
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-center mb-4">
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        0
                      </div>
                      <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        0
                      </div>
                      <div className="text-sm text-gray-500">Uploads</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        0
                      </div>
                      <div className="text-sm text-gray-500">Upvotes</div>
                    </div>
                  </div>

                  {/* New Button - Only show if signed in */}
                  {isSignedIn && (
                    <Button
                      asChild
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Link href="/upload">
                        <Plus className="h-4 w-4 mr-2" />
                        New
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-1">
                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Home</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Library className="h-5 w-5" />
                    <span className="font-medium">My Library</span>
                  </Link>

                  <Link
                    href="/documents"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <StickyNote className="h-5 w-5" />
                    <span className="font-medium">AI Notes</span>
                  </Link>

                  <Link
                    href="/search"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Bot className="h-5 w-5" />
                    <span className="font-medium">Ask AI</span>
                  </Link>

                  <div className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <Trophy className="h-5 w-5" />
                    <span className="font-medium">AI Quiz</span>
                    <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>

                  {/* Recent Section */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Recent</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="ml-8 text-sm text-gray-500 px-3 py-1">
                      My Library
                    </div>
                  </div>

                  {/* Courses Section */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <FolderOpen className="h-5 w-5" />
                        <span className="font-medium">Courses</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Studylists Section */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Users className="h-5 w-5" />
                        <span className="font-medium">Studylists</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-7 w-7 bg-white rounded-md flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-[#4A1D4E]" />
            </div>
            <span className="font-bold text-lg text-white">ZedSolve</span>
          </Link>

          {/* Right: User Actions */}
          <div className="flex items-center space-x-2">
            {/* User Button */}
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-7 w-7",
                  },
                }}
              />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-1"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Language Selector */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 px-2"
            >
              <div className="w-4 h-3 bg-blue-600 rounded-sm flex items-center justify-center mr-1">
                <div className="w-2 h-1 bg-red-600 rounded-sm flex">
                  <div className="w-0.5 h-1 bg-white"></div>
                </div>
              </div>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full hidden md:block bg-white/95 backdrop-blur-md border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/75">
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
