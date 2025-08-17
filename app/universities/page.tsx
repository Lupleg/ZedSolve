"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MapPin,
  Users,
  FileText,
  Star,
  Globe,
  BookOpen,
} from "lucide-react";

// Mock data for universities
const universities = [
  {
    id: 1,
    name: "Massachusetts Institute of Technology",
    shortName: "MIT",
    country: "United States",
    city: "Cambridge, MA",
    logo: "🏛️",
    ranking: 1,
    documentsCount: 15600,
    studentsCount: 2400,
    website: "https://web.mit.edu",
    description:
      "Leading research university focusing on science, technology, and innovation.",
    topCourses: ["Computer Science", "Engineering", "Physics", "Mathematics"],
    verified: true,
  },
  {
    id: 2,
    name: "Stanford University",
    shortName: "Stanford",
    country: "United States",
    city: "Stanford, CA",
    logo: "🌲",
    ranking: 2,
    documentsCount: 14200,
    studentsCount: 3200,
    website: "https://stanford.edu",
    description:
      "Private research university known for entrepreneurship and innovation.",
    topCourses: ["Computer Science", "Business", "Engineering", "Medicine"],
    verified: true,
  },
  {
    id: 3,
    name: "Harvard University",
    shortName: "Harvard",
    country: "United States",
    city: "Cambridge, MA",
    logo: "🍎",
    ranking: 3,
    documentsCount: 18900,
    studentsCount: 4100,
    website: "https://harvard.edu",
    description:
      "Ivy League research university with a rich history and academic excellence.",
    topCourses: ["Business", "Law", "Medicine", "Liberal Arts"],
    verified: true,
  },
  {
    id: 4,
    name: "University of California, Berkeley",
    shortName: "UC Berkeley",
    country: "United States",
    city: "Berkeley, CA",
    logo: "🐻",
    ranking: 4,
    documentsCount: 12800,
    studentsCount: 5600,
    website: "https://berkeley.edu",
    description:
      "Public research university known for academic excellence and social activism.",
    topCourses: [
      "Engineering",
      "Computer Science",
      "Business",
      "Social Sciences",
    ],
    verified: true,
  },
  {
    id: 5,
    name: "University of Oxford",
    shortName: "Oxford",
    country: "United Kingdom",
    city: "Oxford",
    logo: "🏰",
    ranking: 5,
    documentsCount: 11200,
    studentsCount: 3800,
    website: "https://ox.ac.uk",
    description:
      "One of the oldest universities in the English-speaking world.",
    topCourses: ["Liberal Arts", "Philosophy", "History", "Medicine"],
    verified: true,
  },
  {
    id: 6,
    name: "University of Cambridge",
    shortName: "Cambridge",
    country: "United Kingdom",
    city: "Cambridge",
    logo: "⚖️",
    ranking: 6,
    documentsCount: 10500,
    studentsCount: 3400,
    website: "https://cam.ac.uk",
    description:
      "Prestigious collegiate public research university founded in 1209.",
    topCourses: ["Mathematics", "Natural Sciences", "Engineering", "Law"],
    verified: true,
  },
];

const countries = [
  "All Countries",
  ...Array.from(new Set(universities.map((u) => u.country))),
];

export default function UniversitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [sortBy, setSortBy] = useState("ranking");

  const filteredUniversities = universities
    .filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry =
        selectedCountry === "All Countries" || uni.country === selectedCountry;
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking;
        case "documents":
          return b.documentsCount - a.documentsCount;
        case "students":
          return b.studentsCount - a.studentsCount;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Universities</h1>
        <p className="text-muted-foreground">
          Explore academic institutions and their shared documents worldwide
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search universities..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">Ranking</SelectItem>
              <SelectItem value="documents">Most Documents</SelectItem>
              <SelectItem value="students">Most Students</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {filteredUniversities.length} universities
        </p>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <Card
            key={university.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{university.logo}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-muted-foreground">
                        #{university.ranking}
                      </span>
                      {university.verified && (
                        <Badge variant="default" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <CardTitle className="text-lg line-clamp-2">
                {university.name}
              </CardTitle>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {university.city}, {university.country}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {university.description}
              </CardDescription>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-semibold text-sm">
                      {university.documentsCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Documents
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">
                      {university.studentsCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Students
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Courses */}
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">
                  Popular Subjects:
                </div>
                <div className="flex flex-wrap gap-1">
                  {university.topCourses.slice(0, 3).map((course, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                  {university.topCourses.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{university.topCourses.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button className="flex-1" size="sm" asChild>
                  <a href={`/universities/${university.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Documents
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {filteredUniversities.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Universities
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No universities found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all universities.
          </p>
        </div>
      )}
    </div>
  );
}
