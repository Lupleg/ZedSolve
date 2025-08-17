import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all documents with pagination and filtering
export const getDocuments = query({
  args: {
    search: v.optional(v.string()),
    type: v.optional(v.string()),
    university: v.optional(v.string()),
    subject: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("documents");

    // Apply filters
    if (args.type && args.type !== "All") {
      query = query.filter((q) => q.eq(q.field("documentType"), args.type));
    }

    // Add search functionality here if needed

    const documents = await query.order("desc").take(args.limit || 20);

    return documents;
  },
});

// Get a single document by ID
export const getDocument = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) return null;

    // Note: In a real app, you'd want to track views differently
    // This is just for demo purposes
    return document;
  },
});

// Create a new document
export const createDocument = mutation({
  args: {
    title: v.string(),
    description: v.string(),
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
    fileUrl: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
    universityId: v.id("universities"),
    courseId: v.id("courses"),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    semester: v.optional(v.string()),
    year: v.number(),
    professor: v.optional(v.string()),
    language: v.string(),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get user by clerk ID
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      description: args.description,
      content: "",
      authorId: user._id,
      universityId: args.universityId,
      courseId: args.courseId,
      categoryId: args.categoryId,
      tags: args.tags,
      documentType: args.documentType,
      fileUrl: args.fileUrl,
      fileName: args.fileName,
      fileSize: args.fileSize,
      fileType: args.fileType,
      pageCount: 0,
      semester: args.semester,
      year: args.year,
      professor: args.professor,
      language: args.language,
      isPublic: args.isPublic,
      isPremium: false,
      downloadCount: 0,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      rating: 0,
      ratingCount: 0,
      isApproved: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return documentId;
  },
});

// Like/unlike a document
export const toggleLike = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user already liked this document
    const existingLike = await ctx.db
      .query("interactions")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), user._id),
          q.eq(q.field("contentId"), args.documentId),
          q.eq(q.field("interactionType"), "like")
        )
      )
      .first();

    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    if (existingLike) {
      // Remove like
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.documentId, {
        likeCount: document.likeCount - 1,
      });
      return false;
    } else {
      // Add like
      await ctx.db.insert("interactions", {
        userId: user._id,
        contentType: "assignment", // Using assignment as a generic document type
        contentId: args.documentId,
        interactionType: "like",
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.documentId, {
        likeCount: document.likeCount + 1,
      });
      return true;
    }
  },
});

// Get featured documents for homepage
export const getFeaturedDocuments = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("isApproved"), true))
      .order("desc")
      .take(6);
  },
});
