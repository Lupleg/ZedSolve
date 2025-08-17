import { UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  FileText, 
  Download, 
  Heart, 
  Calendar,
  Award,
  Settings,
  Upload
} from "lucide-react";

export default function ProfilePage() {
  // Mock user data - replace with real data from Convex
  const userProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@stanford.edu",
    university: "Stanford University",
    course: "Computer Science",
    year: 3,
    bio: "Passionate CS student interested in machine learning and AI. Love sharing knowledge and helping fellow students succeed.",
    joinedAt: "2023-09-15",
    points: 2450,
    badge: "Top Contributor",
    stats: {
      documentsUploaded: 24,
      totalDownloads: 5680,
      totalLikes: 342,
      commentsReceived: 89
    }
  };

  const recentDocuments = [
    {
      id: 1,
      title: "Machine Learning Final Project",
      type: "Assignment",
      course: "CS 229",
      uploads: 1240,
      likes: 89,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Data Structures Study Guide",
      type: "Notes",
      course: "CS 106B",
      uploads: 890,
      likes: 67,
      date: "2024-01-10"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-20 h-20"
                    }
                  }}
                />
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                    <Badge variant="default">{userProfile.badge}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{userProfile.email}</p>
                  <p className="text-muted-foreground mb-2">
                    Year {userProfile.year} {userProfile.course} at {userProfile.university}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(userProfile.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{userProfile.bio}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1 text-yellow-500" />
                <span className="font-medium">{userProfile.points}</span>
                <span className="text-muted-foreground ml-1">points</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{userProfile.stats.documentsUploaded}</div>
              <div className="text-sm text-muted-foreground">Documents</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Download className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{userProfile.stats.totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{userProfile.stats.totalLikes}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <User className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{userProfile.stats.commentsReceived}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Documents</CardTitle>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc, index) => (
                <div key={doc.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{doc.title}</h3>
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.course}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {doc.uploads}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {doc.likes}
                      </span>
                      <span>{new Date(doc.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {index < recentDocuments.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
