import Link from "next/link";
import { BookOpen, Github, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">ZedSolve</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering students worldwide to share knowledge and succeed
              together. Join our community of learners and contributors.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Browse */}
          <div className="space-y-4">
            <h3 className="font-semibold">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/documents"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?type=assignment"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Assignments
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?type=exam"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Exams & Quizzes
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?type=notes"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Study Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/universities"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Universities
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/upload"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Upload Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Top Contributors
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/copyright"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 ZedSolve. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for
            students worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
