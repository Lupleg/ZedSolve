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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  File,
  X,
  AlertCircle,
  CheckCircle,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const documentTypes = [
  "Assignment",
  "Exam",
  "Quiz",
  "Notes",
  "Presentation",
  "Thesis",
  "Research Paper",
  "Lab Report",
  "Essay",
  "Other",
];

const subjects = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Engineering",
  "Biology",
  "Business",
  "Economics",
  "Psychology",
  "History",
  "Literature",
  "Art",
  "Music",
  "Other",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Portuguese",
  "Italian",
  "Russian",
  "Arabic",
  "Other",
];

export default function UploadPage() {
  const { isSignedIn, user } = useUser();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    documentType: "",
    subject: "",
    course: "",
    university: "",
    professor: "",
    semester: "",
    year: new Date().getFullYear(),
    language: "English",
    tags: [] as string[],
    isPublic: true,
    allowComments: true,
    allowDownloads: true,
  });

  const [currentTag, setCurrentTag] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      alert("Please sign in to upload documents");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    setUploading(true);

    try {
      // TODO: Implement file upload to UploadThing
      // TODO: Save document metadata to Convex

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUploadSuccess(true);
      setFiles([]);
      setFormData({
        title: "",
        description: "",
        documentType: "",
        subject: "",
        course: "",
        university: "",
        professor: "",
        semester: "",
        year: new Date().getFullYear(),
        language: "English",
        tags: [],
        isPublic: true,
        allowComments: true,
        allowDownloads: true,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to upload and share your documents with the
              community.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <CardTitle>Upload Successful!</CardTitle>
            <CardDescription>
              Your document has been uploaded and is being reviewed. You'll be
              notified once it's approved.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setUploadSuccess(false)}>
              Upload Another Document
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Document</h1>
          <p className="text-muted-foreground">
            Share your academic materials with students worldwide and help
            others learn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max 10MB per file)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-muted-foreground mb-4">
                  You can upload multiple files at once
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Selected Files:</Label>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <File className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Information */}
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
              <CardDescription>
                Provide details about your document to help others find it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g., Data Structures Final Exam Solutions"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type *</Label>
                  <Select
                    required
                    value={formData.documentType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, documentType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Briefly describe the content and what makes it valuable..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    required
                    value={formData.subject}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, subject: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course Code</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        course: e.target.value,
                      }))
                    }
                    placeholder="e.g., CS 101, MATH 152"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        university: e.target.value,
                      }))
                    }
                    placeholder="Your university name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professor">Professor/Instructor</Label>
                  <Input
                    id="professor"
                    value={formData.professor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        professor: e.target.value,
                      }))
                    }
                    placeholder="Professor name (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        semester: e.target.value,
                      }))
                    }
                    placeholder="e.g., Fall 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        year: parseInt(e.target.value),
                      }))
                    }
                    min="2000"
                    max="2030"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Permissions</CardTitle>
              <CardDescription>
                Control how others can interact with your document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPublic: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="isPublic">Make this document public</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowComments"
                  checked={formData.allowComments}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      allowComments: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="allowComments">
                  Allow comments and feedback
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowDownloads"
                  checked={formData.allowDownloads}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      allowDownloads: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="allowDownloads">Allow downloads</Label>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              By uploading, you confirm that you have the right to share this
              content and that it complies with our community guidelines.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={uploading || files.length === 0}>
              {uploading ? "Uploading..." : "Upload Document"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
