import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all tutorials with pagination
export const getTutorials = query({
  args: {
    limit: v.optional(v.number()),
    categoryId: v.optional(v.id("categories")),
    difficulty: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    sortBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    let query = ctx.db.query("tutorials").filter((q) => q.eq(q.field("isPublic"), true));

    // Apply filters
    if (args.categoryId) {
      query = query.filter((q) => q.eq(q.field("categoryId"), args.categoryId));
    }

    if (args.difficulty) {
      query = query.filter((q) => q.eq(q.field("difficulty"), args.difficulty));
    }

    if (args.featured) {
      query = query.filter((q) => q.eq(q.field("isFeatured"), true));
    }

    // Apply sorting
    if (args.sortBy === "rating") {
      query = query.order("desc");
    } else if (args.sortBy === "views") {
      query = query.order("desc");
    } else {
      query = query.order("desc"); // Default: newest first
    }

    const tutorials = await query.take(limit);

    // Get author and category details
    const tutorialsWithDetails = await Promise.all(
      tutorials.map(async (tutorial) => {
        const author = await ctx.db.get(tutorial.authorId);
        const category = await ctx.db.get(tutorial.categoryId);
        return {
          ...tutorial,
          author,
          category,
        };
      })
    );

    return tutorialsWithDetails;
  },
});

// Get tutorial by ID
export const getTutorialById = query({
  args: { id: v.id("tutorials") },
  handler: async (ctx, args) => {
    const tutorial = await ctx.db.get(args.id);
    if (!tutorial) return null;

    const author = await ctx.db.get(tutorial.authorId);
    const category = await ctx.db.get(tutorial.categoryId);

    // Get tags
    const tags = await Promise.all(
      tutorial.tags.map(async (tagId) => await ctx.db.get(tagId))
    );

    return {
      ...tutorial,
      author,
      category,
      tags: tags.filter(Boolean),
    };
  },
});

// Create a new tutorial
export const createTutorial = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    categoryId: v.id("categories"),
    tags: v.array(v.id("tags")),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    estimatedTime: v.number(),
    prerequisites: v.optional(v.array(v.string())),
    learningObjectives: v.optional(v.array(v.string())),
    attachments: v.optional(v.array(v.string())),
    videoUrl: v.optional(v.string()),
    githubRepo: v.optional(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("tutorials", {
      ...args,
      isFeatured: false,
      viewCount: 0,
      likeCount: 0,
      bookmarkCount: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update tutorial
export const updateTutorial = mutation({
  args: {
    id: v.id("tutorials"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    tags: v.optional(v.array(v.id("tags"))),
    difficulty: v.optional(v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    )),
    estimatedTime: v.optional(v.number()),
    prerequisites: v.optional(v.array(v.string())),
    learningObjectives: v.optional(v.array(v.string())),
    attachments: v.optional(v.array(v.string())),
    videoUrl: v.optional(v.string()),
    githubRepo: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Get featured tutorials
export const getFeaturedTutorials = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    
    const tutorials = await ctx.db
      .query("tutorials")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .order("desc")
      .take(limit);

    return await Promise.all(
      tutorials.map(async (tutorial) => {
        const author = await ctx.db.get(tutorial.authorId);
        const category = await ctx.db.get(tutorial.categoryId);
        return {
          ...tutorial,
          author,
          category,
        };
      })
    );
  },
});

// Increment tutorial view count
export const incrementTutorialViewCount = mutation({
  args: { id: v.id("tutorials") },
  handler: async (ctx, args) => {
    const tutorial = await ctx.db.get(args.id);
    if (tutorial) {
      await ctx.db.patch(args.id, {
        viewCount: tutorial.viewCount + 1,
      });
    }
  },
});
