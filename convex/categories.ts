import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all categories
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Create a new category
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    slug: v.string(),
    color: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("categories", {
      ...args,
      isActive: true,
    });
  },
});

// Get all tags
export const getTags = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tags")
      .order("desc")
      .collect();
  },
});

// Create a new tag
export const createTag = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tags", {
      ...args,
      usageCount: 0,
    });
  },
});

// Get popular tags
export const getPopularTags = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("tags")
      .order("desc")
      .take(limit);
  },
});
