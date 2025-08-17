import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get comments for a document
export const getComments = query({
  args: {
    contentType: v.string(),
    contentId: v.string(),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .filter((q) =>
        q.and(
          q.eq(q.field("contentType"), args.contentType),
          q.eq(q.field("contentId"), args.contentId),
          q.eq(q.field("parentId"), undefined)
        )
      )
      .order("desc")
      .collect();

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await ctx.db
          .query("comments")
          .filter((q) => q.eq(q.field("parentId"), comment._id))
          .order("asc")
          .collect();

        return {
          ...comment,
          replies,
        };
      })
    );

    return commentsWithReplies;
  },
});

// Create a new comment
export const createComment = mutation({
  args: {
    content: v.string(),
    contentType: v.string(),
    contentId: v.string(),
    parentId: v.optional(v.id("comments")),
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

    const commentId = await ctx.db.insert("comments", {
      content: args.content,
      authorId: user._id,
      contentType: args.contentType as any,
      contentId: args.contentId,
      parentId: args.parentId,
      isApproved: true, // Auto-approve for now
      likeCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Update comment count on the document if it's a document
    if (args.contentType === "assignment" || args.contentType === "solution") {
      // Note: In a real app, you'd want proper type checking here
      // For now, we'll skip the comment count update
    }

    return commentId;
  },
});

// Like/unlike a comment
export const toggleCommentLike = mutation({
  args: {
    commentId: v.id("comments"),
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

    const existingLike = await ctx.db
      .query("interactions")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), user._id),
          q.eq(q.field("contentId"), args.commentId),
          q.eq(q.field("interactionType"), "like")
        )
      )
      .first();

    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (existingLike) {
      // Remove like
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.commentId, {
        likeCount: comment.likeCount - 1,
      });
      return false;
    } else {
      // Add like
      await ctx.db.insert("interactions", {
        userId: user._id,
        contentType: "comment",
        contentId: args.commentId,
        interactionType: "like",
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.commentId, {
        likeCount: comment.likeCount + 1,
      });
      return true;
    }
  },
});
