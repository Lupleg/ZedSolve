"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  Heart,
  Calendar,
  User,
  School
} from "lucide-react";

// Mock data - replace with real data from Convex
const documents = [
  {
    id: 1,
    title: "Advanced Machine Learning - Final Project Report",
    description: "Comprehensive analysis of deep learning architectures with implementation examples and performance comparisons.",
    course: "CS 229",
    university: "Stanford University",
    type: "Assignment",
    author: "Sarah Chen",
    rating: 4.8,
    downloads: 1240,
    views: 5680,
    likes: 89,
    uploadDate: "2024-01-15",
    fileSize: "2.4 MB",
    pages: 24,
    tags: ["Machine Learning", "Deep Learning", "Neural Networks"],
    isPremium: false
  },
  {
    id: 2,
    title: "Organic Chemistry Lab Report - Synthesis of Aspirin",
    description: "Detailed lab report covering the synthesis process, yield calculations, and spectroscopic analysis.",
    course: "CHEM 202",
    university: "MIT",
    type: "Lab Report",
    author: "Alex Rodriguez",
    rating: 4.6,
    downloads: 890,
    views: 3240,
    likes: 67,
    uploadDate: "2024-01-10",
    fileSize: "1.8 MB",
    pages: 16,
    tags: ["Chemistry", "Lab Report", "Synthesis"],
    isPremium: false
  },
  {
    id: 3,
    title: "Calculus III - Vector Fields and Line Integrals Solutions",
    description: "Step-by-step solutions to complex problems involving vector calculus and multivariable functions.",
    course: "MATH 233",
    university: "Harvard University",
    type: "Solutions",
    author: "Emily Johnson",
    rating: 4.9,
    downloads: 2100,
    views: 8900,
    likes: 156,
    uploadDate: "2024-01-20",
    fileSize: "3.1 MB",
    pages: 32,
    tags: ["Mathematics", "Calculus", "Vector Fields"],
    isPremium: true
  }
];

const documentTypes = ["All", "Assignment", "Exam", "Notes", "Lab Report", "Thesis", "Solutions"];
const universities = ["All Universities", "MIT", "Stanford University", "Harvard University", "UC Berkeley"];
const subjects = ["All Subjects", "Computer Science", "Mathematics", "Chemistry", "Physics", "Engineering"];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("recent");

  const filteredDocuments = documents; // Apply filters here

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Documents</h1>
        <p className="text-muted-foreground">
          Discover and download academic materials shared by students worldwide
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents, courses, or authors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((university) => (
                <SelectItem key={university} value={university}>
                  {university}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="downloads">Most Downloads</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredDocuments.length} documents
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">{doc.type}</Badge>
                  {doc.isPremium && <Badge variant="default">Premium</Badge>}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{doc.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {doc.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Course and University */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <School className="h-4 w-4" />
                  <span>{doc.course} • {doc.university}</span>
                </div>

                {/* Author and Date */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>By {doc.author}</span>
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {doc.downloads}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {doc.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {doc.likes}
                    </span>
                  </div>
                  <span>{doc.fileSize} • {doc.pages} pages</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Load More Documents
        </Button>
      </div>
    </div>
  );
}
