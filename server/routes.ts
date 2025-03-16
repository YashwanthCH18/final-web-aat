import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";

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

  const httpServer = createServer(app);
  return httpServer;
}
