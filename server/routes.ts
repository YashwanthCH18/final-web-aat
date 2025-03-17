import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogSchema } from "@shared/schema";
import { ZodError } from "zod";
import { generateBlogContent, isGeminiConfigured } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const result = await storage.createContact(contact);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid form data" });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all blogs
  app.get("/api/blogs", async (_req, res) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  // Get blogs by sector
  app.get("/api/blogs/sector/:sector", async (req, res) => {
    try {
      const blogs = await storage.getBlogsBySector(req.params.sector);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs by sector" });
    }
  });

  // Get single blog
  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(parseInt(req.params.id));
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });

  // Update blog
  app.put("/api/blogs/:id", async (req, res) => {
    try {
      console.log("Received blog update request:", req.params.id);
      console.log("Update data:", req.body);
      
      const id = parseInt(req.params.id);
      const blog = await storage.getBlog(id);
      if (!blog) {
        console.log("Blog not found:", id);
        res.status(404).json({ error: "Blog not found" });
        return;
      }
      
      const updatedBlog = insertBlogSchema.parse({
        ...req.body,
        id
      });
      
      console.log("Validated blog data:", updatedBlog);
      const result = await storage.updateBlog(id, updatedBlog);
      console.log("Blog updated successfully:", result);
      res.json(result);
    } catch (error) {
      console.error("Error updating blog:", error);
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid blog data" });
      } else {
        res.status(500).json({ error: "Failed to update blog" });
      }
    }
  });

  // Delete blog
  app.delete("/api/blogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blog = await storage.getBlog(id);
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }
      
      await storage.deleteBlog(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  });

  // Generate blog using Gemini
  app.post("/api/blogs/generate", async (req, res) => {
    try {
      // Check if Gemini API is configured
      if (!isGeminiConfigured()) {
        res.status(500).json({ 
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file." 
        });
        return;
      }

      const { sector } = req.body;
      
      if (!sector) {
        res.status(400).json({ error: "Sector is required" });
        return;
      }
      
      // Generate blog content using Gemini
      const blogContent = await generateBlogContent(sector);
      
      // Create a new blog with the generated content
      const newBlog = {
        title: blogContent.title,
        content: blogContent.content,
        snippet: blogContent.snippet,
        sector: sector,
        author: blogContent.author
      };
      
      // Validate the blog data
      const validatedBlog = insertBlogSchema.parse(newBlog);
      
      // Save the blog
      const result = await storage.createBlog(validatedBlog);
      
      res.json(result);
    } catch (error) {
      console.error("Error generating blog:", error);
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid blog data" });
      } else {
        res.status(500).json({ error: "Failed to generate blog" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
