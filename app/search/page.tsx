"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Calendar,
  User,
  School,
} from "lucide-react";

// Mock search results
const searchResults = [
  {
    id: 1,
    title: "Advanced Machine Learning - Final Project Report",
    description:
      "Comprehensive analysis of deep learning architectures with implementation examples.",
    course: "CS 229",
    university: "Stanford University",
    type: "Assignment",
    author: "Sarah Chen",
    rating: 4.8,
    downloads: 1240,
    views: 5680,
    uploadDate: "2024-01-15",
    tags: ["Machine Learning", "Deep Learning", "Neural Networks"],
  },
  {
    id: 2,
    title: "Data Structures and Algorithms - Comprehensive Study Guide",
    description:
      "Complete study guide covering all major data structures and algorithms topics.",
    course: "CS 106B",
    university: "Stanford University",
    type: "Notes",
    author: "Alex Rodriguez",
    rating: 4.9,
    downloads: 2100,
    views: 8900,
    uploadDate: "2024-01-20",
    tags: ["Data Structures", "Algorithms", "Computer Science"],
  },
  {
    id: 3,
    title: "Calculus II - Integration Techniques Practice Problems",
    description:
      "Extensive collection of integration problems with detailed solutions.",
    course: "MATH 152",
    university: "MIT",
    type: "Practice",
    author: "Emily Johnson",
    rating: 4.7,
    downloads: 1560,
    views: 6420,
    uploadDate: "2024-01-18",
    tags: ["Calculus", "Integration", "Mathematics"],
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [documentType, setDocumentType] = useState("all");
  const [university, setUniversity] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const filteredResults = searchResults.filter((result) => {
    const matchesQuery =
      searchQuery === "" ||
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType =
      documentType === "all" || result.type.toLowerCase() === documentType;
    const matchesUniversity =
      university === "all" || result.university === university;

    return matchesQuery && matchesType && matchesUniversity;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : "Browse all documents"}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents, courses, or authors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="practice">Practice</SelectItem>
            </SelectContent>
          </Select>

          <Select value={university} onValueChange={setUniversity}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              <SelectItem value="Stanford University">
                Stanford University
              </SelectItem>
              <SelectItem value="MIT">MIT</SelectItem>
              <SelectItem value="Harvard University">
                Harvard University
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredResults.length} of {searchResults.length} results
        </p>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {filteredResults.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">{result.type}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{result.rating}</span>
                  </div>
                </div>
              </div>

              <CardTitle className="text-xl mb-2">
                <a
                  href={`/documents/${result.id}`}
                  className="hover:text-primary"
                >
                  {result.title}
                </a>
              </CardTitle>

              <CardDescription className="text-base">
                {result.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <School className="h-4 w-4" />
                  <span>
                    {result.course} • {result.university}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>By {result.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(result.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {result.downloads} downloads
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {result.views} views
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {result.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setDocumentType("all");
              setUniversity("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredResults.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Results
          </Button>
        </div>
      )}
    </div>
  );
}
