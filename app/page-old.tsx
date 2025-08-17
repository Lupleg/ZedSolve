"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Users, 
  FileText, 
  TrendingUp,
  GraduationCap,
  Upload,
  Star,
  Download,
  Eye
} from "lucide-react";

const featuredCategories = [
  {
    name: "Computer Science",
    icon: "💻",
    count: "12,500+ documents",
    color: "bg-blue-100 text-blue-800"
  },
  {
    name: "Mathematics",
    icon: "📐",
    count: "8,200+ documents",
    color: "bg-green-100 text-green-800"
  },
  {
    name: "Engineering",
    icon: "⚙️",
    count: "15,600+ documents",
    color: "bg-purple-100 text-purple-800"
  },
  {
    name: "Business",
    icon: "📊",
    count: "9,800+ documents",
    color: "bg-orange-100 text-orange-800"
  },
  {
    name: "Physics",
    icon: "🔬",
    count: "6,400+ documents",
    color: "bg-red-100 text-red-800"
  },
  {
    name: "Chemistry",
    icon: "🧪",
    count: "7,200+ documents",
    color: "bg-teal-100 text-teal-800"
  }
];

const recentDocuments = [
  {
    id: 1,
    title: "Data Structures and Algorithms - Final Exam Solutions",
    course: "CS 201",
    university: "MIT",
    type: "Exam",
    rating: 4.8,
    downloads: 1240,
    views: 5680,
    uploadedBy: "Sarah Chen",
    uploadedAt: "2 days ago"
  },
  {
    id: 2,
    title: "Machine Learning Assignment 3 - Neural Networks",
    course: "CS 229",
    university: "Stanford",
    type: "Assignment", 
    rating: 4.9,
    downloads: 890,
    views: 3240,
    uploadedBy: "Alex Rodriguez",
    uploadedAt: "1 week ago"
  },
  {
    id: 3,
    title: "Calculus II Midterm Practice Problems with Solutions",
    course: "MATH 152",
    university: "Harvard",
    type: "Practice",
    rating: 4.7,
    downloads: 2100,
    views: 8900,
    uploadedBy: "Emily Johnson",
    uploadedAt: "3 days ago"
  }
];

const stats = [
  { label: "Documents Shared", value: "250,000+", icon: FileText },
  { label: "Universities", value: "1,200+", icon: GraduationCap },
  { label: "Active Students", value: "500,000+", icon: Users },
  { label: "Downloads This Month", value: "2.5M", icon: Download },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Share Your Academic Journey
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join millions of students sharing assignments, exams, notes, and academic solutions worldwide
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search by course, university, or document type..."
                className="pl-12 pr-4 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-2 h-10">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/documents">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Documents
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload & Share
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Study Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.count}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Documents */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Recently Shared</h2>
            <Button variant="outline" asChild>
              <Link href="/documents">
                View All
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{doc.type}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{doc.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                  <CardDescription>
                    {doc.course} • {doc.university}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {doc.downloads}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {doc.views}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    By {doc.uploadedBy} • {doc.uploadedAt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Sharing Your Knowledge Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of students helping each other succeed. Upload your documents and earn points while helping others learn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link href="/auth/sign-up" className="flex items-center">
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/about" className="flex items-center">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
