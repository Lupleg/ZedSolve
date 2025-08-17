"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Eye,
  Heart,
  Star,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User,
  School,
  BookOpen,
  FileText,
  Flag,
} from "lucide-react";

// Mock document data
const document = {
  id: 1,
  title: "Advanced Machine Learning - Final Project Report",
  description:
    "Comprehensive analysis of deep learning architectures with implementation examples and performance comparisons. This report covers various neural network architectures including CNNs, RNNs, and Transformers with practical applications in computer vision and natural language processing.",
  content: `# Advanced Machine Learning Final Project Report

## Abstract
This report presents a comprehensive study of modern deep learning architectures...

## Introduction
Machine learning has evolved significantly over the past decade...

## Methodology
We implemented and compared several state-of-the-art architectures:
1. Convolutional Neural Networks (CNNs)
2. Recurrent Neural Networks (RNNs)
3. Transformer Architecture

## Results
Our experiments show that...`,
  course: "CS 229",
  university: "Stanford University",
  type: "Assignment",
  author: {
    id: 1,
    name: "Sarah Chen",
    avatar: "",
    university: "Stanford University",
    year: 3,
  },
  rating: 4.8,
  downloads: 1240,
  views: 5680,
  likes: 89,
  uploadDate: "2024-01-15",
  fileSize: "2.4 MB",
  pages: 24,
  fileUrl: "/documents/ml-final-project.pdf",
  tags: ["Machine Learning", "Deep Learning", "Neural Networks", "AI"],
  isPremium: false,
  semester: "Fall 2023",
  year: 2023,
  professor: "Dr. Andrew Ng",
  grade: "A+",
  language: "English",
};

// Mock comments data
const initialComments = [
  {
    id: 1,
    content:
      "This is an excellent report! The methodology section is particularly well-written and the results are clearly presented. Thanks for sharing!",
    author: {
      id: 2,
      name: "Alex Rodriguez",
      avatar: "",
      university: "MIT",
    },
    createdAt: "2024-01-20",
    likes: 12,
    dislikes: 0,
    replies: [
      {
        id: 2,
        content: "I agree! This helped me understand CNNs much better.",
        author: {
          id: 3,
          name: "Emily Johnson",
          avatar: "",
          university: "Harvard",
        },
        createdAt: "2024-01-21",
        likes: 5,
        dislikes: 0,
      },
    ],
  },
  {
    id: 3,
    content:
      "Great work on the transformer section. Could you share more details about the hyperparameter tuning process?",
    author: {
      id: 4,
      name: "Michael Wang",
      avatar: "",
      university: "UC Berkeley",
    },
    createdAt: "2024-01-22",
    likes: 8,
    dislikes: 1,
    replies: [],
  },
];

export default function DocumentDetailPage() {
  const { isSignedIn, user } = useUser();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: {
        id: 999,
        name: user?.fullName || "Current User",
        avatar: user?.imageUrl || "",
        university: "Your University",
      },
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setShowCommentForm(false);
  };

  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      content: replyContent,
      author: {
        id: 999,
        name: user?.fullName || "Current User",
        avatar: user?.imageUrl || "",
        university: "Your University",
      },
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      dislikes: 0,
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyContent("");
    setReplyingTo(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Document Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <Badge variant="secondary">{document.type}</Badge>
                {document.isPremium && <Badge variant="default">Premium</Badge>}
                <Badge variant="outline">Verified</Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{document.rating}</span>
                <span className="text-muted-foreground text-sm">
                  (24 reviews)
                </span>
              </div>
            </div>

            <CardTitle className="text-2xl mb-2">{document.title}</CardTitle>
            <CardDescription className="text-base">
              {document.description}
            </CardDescription>

            {/* Course and University Info */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <School className="h-4 w-4" />
                <span>
                  {document.course} • {document.university}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Professor {document.professor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {document.semester} {document.year}
                </span>
              </div>
              {document.grade && (
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>Grade: {document.grade}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {/* Stats */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  {document.downloads} downloads
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {document.views} views
                </span>
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {document.likes} likes
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {document.fileSize} • {document.pages} pages •{" "}
                {document.language}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1 sm:flex-none">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleLike}
                className={
                  isLiked ? "bg-red-50 border-red-200 text-red-600" : ""
                }
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="outline"
                onClick={handleBookmark}
                className={
                  isBookmarked ? "bg-blue-50 border-blue-200 text-blue-600" : ""
                }
              >
                <BookOpen
                  className={`h-4 w-4 mr-2 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="icon">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Author Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">About the Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={document.author.avatar} />
                <AvatarFallback>{document.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{document.author.name}</div>
                <div className="text-sm text-muted-foreground">
                  Year {document.author.year} Student at{" "}
                  {document.author.university}
                </div>
                <div className="text-sm text-muted-foreground">
                  Uploaded on{" "}
                  {new Date(document.uploadDate).toLocaleDateString()}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Document Preview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Document Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{document.content}</div>
              </div>
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-muted-foreground mb-4">
                  This is a preview. Download the full document to see all{" "}
                  {document.pages} pages.
                </p>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                Comments (
                {comments.reduce(
                  (total, comment) => total + 1 + comment.replies.length,
                  0
                )}
                )
              </CardTitle>
              {isSignedIn && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCommentForm(!showCommentForm)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Comment Form */}
            {showCommentForm && isSignedIn && (
              <div className="mb-6 p-4 border rounded-lg">
                <Textarea
                  placeholder="Share your thoughts about this document..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCommentForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleComment}>
                    Post Comment
                  </Button>
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {comment.author.university}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          {comment.dislikes}
                        </Button>
                        {isSignedIn && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="ml-12 flex space-x-4">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={reply.author.avatar} />
                        <AvatarFallback className="text-xs">
                          {reply.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">
                            {reply.author.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {reply.author.university}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{reply.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {reply.dislikes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="ml-12 p-3 border rounded-lg">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="mb-2"
                        rows={2}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReply(comment.id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isSignedIn && (
              <div className="text-center py-8 border-t">
                <p className="text-muted-foreground mb-4">
                  Sign in to join the conversation and share your thoughts
                </p>
                <Button>Sign In to Comment</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
