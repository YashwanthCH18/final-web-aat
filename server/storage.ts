import { type Blog, type Contact, type InsertBlog, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Contact form
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Blog operations
  getBlogs(): Promise<Blog[]>;
  getBlogsBySector(sector: string): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private blogs: Map<number, Blog>;
  private contactId: number;
  private blogId: number;

  constructor() {
    this.contacts = new Map();
    this.blogs = new Map();
    this.contactId = 1;
    this.blogId = 1;

    // Initialize with some sample blog posts
    const sampleBlogs: InsertBlog[] = [
      {
        title: "The Future of EdTech",
        content: "Long form content about educational technology trends...",
        snippet: "Exploring the latest innovations in educational technology",
        sector: "Edtech",
        author: "John Doe"
      },
      {
        title: "FinTech Revolution",
        content: "Detailed analysis of financial technology impact...",
        snippet: "How digital payments are changing the financial landscape",
        sector: "Fintech",
        author: "Jane Smith"
      }
    ];

    sampleBlogs.forEach(blog => this.createBlog(blog));
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const newContact = {
      ...contact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  private createBlog(blog: InsertBlog): Blog {
    const id = this.blogId++;
    const newBlog = {
      ...blog,
      id,
      createdAt: new Date()
    };
    this.blogs.set(id, newBlog);
    return newBlog;
  }

  async getBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async getBlogsBySector(sector: string): Promise<Blog[]> {
    return Array.from(this.blogs.values()).filter(
      blog => blog.sector.toLowerCase() === sector.toLowerCase()
    );
  }

  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }
}

export const storage = new MemStorage();
