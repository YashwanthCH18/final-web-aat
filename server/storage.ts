import { type Blog, type Contact, type InsertBlog, type InsertContact } from "@shared/schema";
import fs from 'fs/promises';
import path from 'path';

export interface IStorage {
  // Contact form
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Blog operations
  getBlogs(): Promise<Blog[]>;
  getBlogsBySector(sector: string): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | null>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: number, blog: InsertBlog): Promise<Blog>;
  deleteBlog(id: number): Promise<void>;
}

export class FileStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private blogs: Map<number, Blog>;
  private contactId: number;
  private blogId: number;
  private dataDir: string;

  constructor() {
    this.contacts = new Map();
    this.blogs = new Map();
    this.contactId = 1;
    this.blogId = 1;
    this.dataDir = path.join(process.cwd(), 'data');
  }

  private async ensureDataDir() {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  private async loadData() {
    await this.ensureDataDir();
    
    try {
      const contactsData = await fs.readFile(path.join(this.dataDir, 'contacts.json'), 'utf-8');
      const blogsData = await fs.readFile(path.join(this.dataDir, 'blogs.json'), 'utf-8');
      
      const contacts = JSON.parse(contactsData);
      const blogs = JSON.parse(blogsData);
      
      this.contacts = new Map(Object.entries(contacts));
      this.blogs = new Map(Object.entries(blogs));
      
      // Update IDs to be the maximum existing ID + 1
      this.contactId = Math.max(0, ...Array.from(this.contacts.keys())) + 1;
      this.blogId = Math.max(0, ...Array.from(this.blogs.keys())) + 1;
    } catch (error) {
      // If files don't exist, start with empty storage
      console.log('No existing data found, starting with empty storage');
    }
  }

  private async saveData() {
    await this.ensureDataDir();
    
    const contactsObj = Object.fromEntries(this.contacts);
    const blogsObj = Object.fromEntries(this.blogs);
    
    await fs.writeFile(
      path.join(this.dataDir, 'contacts.json'),
      JSON.stringify(contactsObj, null, 2)
    );
    
    await fs.writeFile(
      path.join(this.dataDir, 'blogs.json'),
      JSON.stringify(blogsObj, null, 2)
    );
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    await this.loadData();
    const id = this.contactId++;
    const newContact = {
      ...contact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    await this.saveData();
    return newContact;
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    await this.loadData();
    const id = this.blogId++;
    const newBlog = {
      ...blog,
      id,
      createdAt: new Date()
    };
    this.blogs.set(id, newBlog);
    await this.saveData();
    return newBlog;
  }

  async getBlogs(): Promise<Blog[]> {
    await this.loadData();
    return Array.from(this.blogs.values());
  }

  async getBlogsBySector(sector: string): Promise<Blog[]> {
    await this.loadData();
    return Array.from(this.blogs.values()).filter(
      blog => blog.sector.toLowerCase() === sector.toLowerCase()
    );
  }

  async getBlog(id: number): Promise<Blog | null> {
    await this.loadData();
    return this.blogs.get(id) || null;
  }

  async updateBlog(id: number, blog: InsertBlog): Promise<Blog> {
    await this.loadData();
    const existingBlog = this.blogs.get(id);
    if (!existingBlog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    
    const updatedBlog = {
      ...blog,
      id,
      createdAt: existingBlog.createdAt
    };
    
    this.blogs.set(id, updatedBlog);
    await this.saveData();
    return updatedBlog;
  }

  async deleteBlog(id: number): Promise<void> {
    await this.loadData();
    if (!this.blogs.has(id)) {
      throw new Error(`Blog with id ${id} not found`);
    }
    
    this.blogs.delete(id);
    await this.saveData();
  }
}

export const storage = new FileStorage();
