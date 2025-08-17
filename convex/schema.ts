import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table
  users: defineTable({
    clerkId: v.string(), // Clerk authentication ID
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    university: v.optional(v.string()),
    course: v.optional(v.string()),
    year: v.optional(v.number()),
    bio: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    website: v.optional(v.string()),
    role: v.union(
      v.literal("student"),
      v.literal("instructor"),
      v.literal("admin")
    ),
    isVerified: v.boolean(),
    points: v.number(), // Gamification points
    joinedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_clerk_id", ["clerkId"]),

  // Universities table
  universities: defineTable({
    name: v.string(),
    country: v.string(),
    website: v.optional(v.string()),
    logo: v.optional(v.string()),
    isVerified: v.boolean(),
  }),

  // Courses table
  courses: defineTable({
    name: v.string(),
    code: v.string(),
    universityId: v.id("universities"),
    description: v.optional(v.string()),
    faculty: v.optional(v.string()),
    level: v.union(
      v.literal("undergraduate"),
      v.literal("graduate"),
      v.literal("postgraduate")
    ),
  })
    .index("by_university", ["universityId"])
    .index("by_code", ["code"]),

  // Documents/Papers (main content type for StudoCu-like functionality)
  documents: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.optional(v.string()), // Text content for preview
    authorId: v.id("users"),
    universityId: v.id("universities"),
    courseId: v.id("courses"),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    documentType: v.union(
      v.literal("assignment"),
      v.literal("exam"),
      v.literal("quiz"),
      v.literal("notes"),
      v.literal("presentation"),
      v.literal("thesis"),
      v.literal("research_paper"),
      v.literal("lab_report"),
      v.literal("essay"),
      v.literal("other")
    ),
    fileUrl: v.string(), // URL to the uploaded file
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(), // pdf, docx, pptx, etc.
    pageCount: v.optional(v.number()),
    semester: v.optional(v.string()),
    year: v.number(),
    professor: v.optional(v.string()),
    grade: v.optional(v.string()), // Grade received (if applicable)
    language: v.string(),
    isPublic: v.boolean(),
    isPremium: v.boolean(), // For premium content
    downloadCount: v.number(),
    viewCount: v.number(),
    likeCount: v.number(),
    commentCount: v.number(),
    rating: v.number(), // Average rating
    ratingCount: v.number(),
    isApproved: v.boolean(),
    moderatedBy: v.optional(v.id("users")),
    moderatedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_university", ["universityId"])
    .index("by_course", ["courseId"])
    .index("by_category", ["categoryId"])
    .index("by_type", ["documentType"])
    .index("by_approved", ["isApproved"])
    .index("by_created_at", ["createdAt"])
    .index("by_rating", ["rating"]),

  // Categories for organizing content
  categories: defineTable({
    name: v.string(),
    description: v.string(),
    slug: v.string(),
    color: v.string(),
    icon: v.string(),
    isActive: v.boolean(),
  }).index("by_slug", ["slug"]),

  // Tags for better organization
  tags: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
    usageCount: v.number(),
  }).index("by_slug", ["slug"]),

  // Assignments
  assignments: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.string(), // Markdown content
    authorId: v.id("users"),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    estimatedTime: v.number(), // in minutes
    dueDate: v.optional(v.number()),
    university: v.optional(v.string()),
    course: v.string(),
    semester: v.optional(v.string()),
    year: v.optional(v.number()),
    attachments: v.optional(v.array(v.string())), // file URLs
    isPublic: v.boolean(),
    viewCount: v.number(),
    likeCount: v.number(),
    downloadCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_category", ["categoryId"])
    .index("by_course", ["course"])
    .index("by_difficulty", ["difficulty"])
    .index("by_created_at", ["createdAt"]),

  // Solutions to assignments
  solutions: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.string(), // Markdown content
    code: v.optional(v.string()), // Code solution
    language: v.optional(v.string()), // Programming language
    authorId: v.id("users"),
    assignmentId: v.optional(v.id("assignments")),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    isApproved: v.boolean(),
    approvedBy: v.optional(v.id("users")),
    approvedAt: v.optional(v.number()),
    attachments: v.optional(v.array(v.string())), // file URLs
    githubRepo: v.optional(v.string()),
    liveDemo: v.optional(v.string()),
    isPublic: v.boolean(),
    viewCount: v.number(),
    likeCount: v.number(),
    downloadCount: v.number(),
    rating: v.number(), // Average rating
    ratingCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_assignment", ["assignmentId"])
    .index("by_category", ["categoryId"])
    .index("by_difficulty", ["difficulty"])
    .index("by_approved", ["isApproved"])
    .index("by_created_at", ["createdAt"])
    .index("by_rating", ["rating"]),

  // Tutorial sheets and guides
  tutorials: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.string(), // Markdown content
    authorId: v.id("users"),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    estimatedTime: v.number(), // in minutes
    prerequisites: v.optional(v.array(v.string())),
    learningObjectives: v.optional(v.array(v.string())),
    attachments: v.optional(v.array(v.string())), // file URLs
    videoUrl: v.optional(v.string()),
    githubRepo: v.optional(v.string()),
    isPublic: v.boolean(),
    isFeatured: v.boolean(),
    viewCount: v.number(),
    likeCount: v.number(),
    bookmarkCount: v.number(),
    rating: v.number(),
    ratingCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_category", ["categoryId"])
    .index("by_difficulty", ["difficulty"])
    .index("by_featured", ["isFeatured"])
    .index("by_created_at", ["createdAt"])
    .index("by_rating", ["rating"]),

  // General challenges and coding problems
  challenges: defineTable({
    title: v.string(),
    description: v.string(),
    problemStatement: v.string(), // Detailed problem description
    authorId: v.id("users"),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard")
    ),
    timeLimit: v.optional(v.number()), // in minutes
    memoryLimit: v.optional(v.number()), // in MB
    testCases: v.optional(
      v.array(
        v.object({
          input: v.string(),
          expectedOutput: v.string(),
          isPublic: v.boolean(),
        })
      )
    ),
    sampleInput: v.optional(v.string()),
    sampleOutput: v.optional(v.string()),
    constraints: v.optional(v.array(v.string())),
    hints: v.optional(v.array(v.string())),
    isContest: v.boolean(),
    contestId: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    isPublic: v.boolean(),
    submissionCount: v.number(),
    solvedCount: v.number(),
    viewCount: v.number(),
    likeCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_category", ["categoryId"])
    .index("by_difficulty", ["difficulty"])
    .index("by_contest", ["isContest"])
    .index("by_created_at", ["createdAt"]),

  // User submissions for challenges
  submissions: defineTable({
    userId: v.id("users"),
    challengeId: v.id("challenges"),
    code: v.string(),
    language: v.string(),
    status: v.union(
      v.literal("accepted"),
      v.literal("wrong_answer"),
      v.literal("time_limit_exceeded"),
      v.literal("memory_limit_exceeded"),
      v.literal("runtime_error"),
      v.literal("compilation_error")
    ),
    executionTime: v.optional(v.number()),
    memoryUsed: v.optional(v.number()),
    testsPassed: v.number(),
    totalTests: v.number(),
    score: v.number(),
    submittedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_challenge", ["challengeId"])
    .index("by_status", ["status"])
    .index("by_submitted_at", ["submittedAt"]),

  // Comments on content
  comments: defineTable({
    content: v.string(),
    authorId: v.id("users"),
    contentType: v.union(
      v.literal("assignment"),
      v.literal("solution"),
      v.literal("tutorial"),
      v.literal("challenge")
    ),
    contentId: v.string(), // ID of the content being commented on
    parentId: v.optional(v.id("comments")), // For replies
    isApproved: v.boolean(),
    likeCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_content", ["contentType", "contentId"])
    .index("by_parent", ["parentId"])
    .index("by_created_at", ["createdAt"]),

  // User interactions (likes, bookmarks, etc.)
  interactions: defineTable({
    userId: v.id("users"),
    contentType: v.union(
      v.literal("assignment"),
      v.literal("solution"),
      v.literal("tutorial"),
      v.literal("challenge"),
      v.literal("comment")
    ),
    contentId: v.string(),
    interactionType: v.union(
      v.literal("like"),
      v.literal("bookmark"),
      v.literal("view"),
      v.literal("download")
    ),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_content", ["contentType", "contentId"])
    .index("by_interaction", ["interactionType"])
    .index("by_user_content", ["userId", "contentType", "contentId"]),

  // Ratings for content
  ratings: defineTable({
    userId: v.id("users"),
    contentType: v.union(v.literal("solution"), v.literal("tutorial")),
    contentId: v.string(),
    rating: v.number(), // 1-5 stars
    review: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_content", ["contentType", "contentId"])
    .index("by_user_content", ["userId", "contentType", "contentId"]),

  // Notifications
  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("like"),
      v.literal("comment"),
      v.literal("follow"),
      v.literal("solution_approved"),
      v.literal("new_challenge"),
      v.literal("assignment_due")
    ),
    title: v.string(),
    message: v.string(),
    relatedId: v.optional(v.string()),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_read", ["isRead"])
    .index("by_created_at", ["createdAt"]),
});
