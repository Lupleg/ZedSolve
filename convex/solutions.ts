import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all solutions with pagination
export const getSolutions = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    difficulty: v.optional(v.string()),
    sortBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    let query = ctx.db.query("solutions").filter((q) => q.eq(q.field("isPublic"), true));

    // Apply filters
    if (args.categoryId) {
      query = query.filter((q) => q.eq(q.field("categoryId"), args.categoryId));
    }

    if (args.difficulty) {
      query = query.filter((q) => q.eq(q.field("difficulty"), args.difficulty));
    }

    // Apply sorting
    if (args.sortBy === "rating") {
      query = query.order("desc");
    } else if (args.sortBy === "views") {
      query = query.order("desc");
    } else {
      query = query.order("desc"); // Default: newest first
    }

    const solutions = await query.take(limit);

    // Get author details for each solution
    const solutionsWithAuthors = await Promise.all(
      solutions.map(async (solution) => {
        const author = await ctx.db.get(solution.authorId);
        const category = await ctx.db.get(solution.categoryId);
        return {
          ...solution,
          author,
          category,
        };
      })
    );

    return solutionsWithAuthors;
  },
});

// Get solution by ID
export const getSolutionById = query({
  args: { id: v.id("solutions") },
  handler: async (ctx, args) => {
    const solution = await ctx.db.get(args.id);
    if (!solution) return null;

    const author = await ctx.db.get(solution.authorId);
    const category = await ctx.db.get(solution.categoryId);

    // Get tags
    const tags = await Promise.all(
      solution.tags.map(async (tagId) => await ctx.db.get(tagId))
    );

    return {
      ...solution,
      author,
      category,
      tags: tags.filter(Boolean),
    };
  },
});

// Create a new solution
export const createSolution = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.string(),
    code: v.optional(v.string()),
    language: v.optional(v.string()),
    authorId: v.id("users"),
    assignmentId: v.optional(v.id("assignments")),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    attachments: v.optional(v.array(v.string())),
    githubRepo: v.optional(v.string()),
    liveDemo: v.optional(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("solutions", {
      ...args,
      isApproved: false,
      viewCount: 0,
      likeCount: 0,
      downloadCount: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update solution
export const updateSolution = mutation({
  args: {
    id: v.id("solutions"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    code: v.optional(v.string()),
    language: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    tags: v.optional(v.array(v.id("tags"))),
    difficulty: v.optional(v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    )),
    attachments: v.optional(v.array(v.string())),
    githubRepo: v.optional(v.string()),
    liveDemo: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Approve solution
export const approveSolution = mutation({
  args: {
    id: v.id("solutions"),
    approvedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      isApproved: true,
      approvedBy: args.approvedBy,
      approvedAt: Date.now(),
    });
  },
});

// Increment view count
export const incrementViewCount = mutation({
  args: { id: v.id("solutions") },
  handler: async (ctx, args) => {
    const solution = await ctx.db.get(args.id);
    if (solution) {
      await ctx.db.patch(args.id, {
        viewCount: solution.viewCount + 1,
      });
    }
  },
});

// Get featured solutions
export const getFeaturedSolutions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    
    const solutions = await ctx.db
      .query("solutions")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .filter((q) => q.eq(q.field("isApproved"), true))
      .order("desc")
      .take(limit);

    return await Promise.all(
      solutions.map(async (solution) => {
        const author = await ctx.db.get(solution.authorId);
        const category = await ctx.db.get(solution.categoryId);
        return {
          ...solution,
          author,
          category,
        };
      })
    );
  },
});
