import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all universities
export const getUniversities = query({
  args: {
    search: v.optional(v.string()),
    country: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("universities");
    
    if (args.country && args.country !== "All Countries") {
      query = query.filter((q) => q.eq(q.field("country"), args.country));
    }
    
    const universities = await query.take(args.limit || 50);
    
    // Filter by search if provided
    if (args.search) {
      return universities.filter(uni => 
        uni.name.toLowerCase().includes(args.search!.toLowerCase())
      );
    }
    
    return universities;
  },
});

// Get a single university by ID
export const getUniversity = query({
  args: { id: v.id("universities") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new university
export const createUniversity = mutation({
  args: {
    name: v.string(),
    country: v.string(),
    website: v.optional(v.string()),
    logo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("universities", {
      ...args,
      isVerified: false,
    });
  },
});

// Get courses for a university
export const getCoursesByUniversity = query({
  args: { universityId: v.id("universities") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("universityId"), args.universityId))
      .collect();
  },
});

// Create a new course
export const createCourse = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    universityId: v.id("universities"),
    description: v.optional(v.string()),
    faculty: v.optional(v.string()),
    level: v.union(v.literal("undergraduate"), v.literal("graduate"), v.literal("postgraduate")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("courses", args);
  },
});
