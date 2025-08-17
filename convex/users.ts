import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
  },
});

// Create or update user from Clerk
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
        avatar: args.avatar,
      });
      return existingUser._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        clerkId: args.clerkId,
        name: args.name,
        email: args.email,
        avatar: args.avatar,
        role: "student",
        isVerified: false,
        points: 0,
        joinedAt: Date.now(),
      });
    }
  },
});

// Get user profile
export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    // Get user's documents count
    const documentsCount = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("authorId"), args.userId))
      .collect()
      .then(docs => docs.length);

    // Get user's total downloads
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("authorId"), args.userId))
      .collect();
    
    const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloadCount, 0);

    return {
      ...user,
      documentsCount,
      totalDownloads,
    };
  },
});

// Update user profile
export const updateUserProfile = mutation({
  args: {
    university: v.optional(v.string()),
    course: v.optional(v.string()),
    year: v.optional(v.number()),
    bio: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    website: v.optional(v.string()),
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

    await ctx.db.patch(user._id, args);
    return user._id;
  },
});
