"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Menu, 
  BookOpen, 
  Code, 
  Trophy, 
  FileText, 
  User,
  Bell,
  Settings,
  LogIn,
  UserPlus
} from "lucide-react";

export function MainNavigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-bold sm:inline-block text-xl">
              ZedSolve
            </span>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/solutions"
                          >
                            <Code className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Browse Solutions
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore comprehensive solutions to programming challenges and assignments.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/solutions/data-structures" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Data Structures</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Arrays, linked lists, trees, graphs, and more.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/solutions/algorithms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Algorithms</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Sorting, searching, dynamic programming solutions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/solutions/web-development" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Web Development</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Frontend, backend, and full-stack projects.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tutorials</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/tutorials/beginner" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Beginner Guides</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Start your programming journey with these foundational tutorials.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/tutorials/intermediate" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Intermediate</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Advance your skills with intermediate programming concepts.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/tutorials/advanced" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Advanced Topics</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Master complex algorithms and system design patterns.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/tutorials/frameworks" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Frameworks</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              Learn popular frameworks and libraries step by step.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/assignments" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Assignments
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/challenges" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Challenges
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search solutions, tutorials..."
                className="w-[300px] pl-8"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>

            {/* User actions */}
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>

            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Code className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-xl">ZedSolve</span>
      </Link>
      
      <div className="flex flex-col space-y-2">
        <Link
          href="/solutions"
          className="flex items-center space-x-2 text-sm font-medium hover:text-accent-foreground"
        >
          <Code className="h-4 w-4" />
          <span>Solutions</span>
        </Link>
        <Link
          href="/tutorials"
          className="flex items-center space-x-2 text-sm font-medium hover:text-accent-foreground"
        >
          <BookOpen className="h-4 w-4" />
          <span>Tutorials</span>
        </Link>
        <Link
          href="/assignments"
          className="flex items-center space-x-2 text-sm font-medium hover:text-accent-foreground"
        >
          <FileText className="h-4 w-4" />
          <span>Assignments</span>
        </Link>
        <Link
          href="/challenges"
          className="flex items-center space-x-2 text-sm font-medium hover:text-accent-foreground"
        >
          <Trophy className="h-4 w-4" />
          <span>Challenges</span>
        </Link>
      </div>

      <div className="flex flex-col space-y-2 pt-4">
        <Button variant="outline" className="justify-start">
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
        <Button className="justify-start">
          <UserPlus className="h-4 w-4 mr-2" />
          Sign Up
        </Button>
      </div>
    </div>
  );
}
