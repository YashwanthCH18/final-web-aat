import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import type { Blog, InsertBlog } from "@shared/schema";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BlogList() {
  const { sector } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: [`/api/blogs/sector/${sector}`]
  });

  // Add mutation for generating a new blog
  const generateBlogMutation = useMutation({
    mutationFn: async () => {
      if (!sector) {
        throw new Error('Sector is required');
      }
      
      const response = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sector }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate blog');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Refetch blogs after successful generation
      if (sector) {
        queryClient.invalidateQueries({ queryKey: [`/api/blogs/sector/${sector}`] });
      }
      toast({
        title: "Blog Generated",
        description: "A new blog has been generated for this sector",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate blog",
        variant: "destructive",
      });
    }
  });

  // Add mutation for updating a blog
  const updateBlogMutation = useMutation({
    mutationFn: async (blog: Blog) => {
      console.log("Sending blog update request:", blog);
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Error response from server:", error);
        throw new Error(error.error || 'Failed to update blog');
      }
      
      const result = await response.json();
      console.log("Blog update response:", result);
      return result;
    },
    onSuccess: () => {
      // Refetch blogs after successful update
      if (sector) {
        queryClient.invalidateQueries({ queryKey: [`/api/blogs/sector/${sector}`] });
      }
      setEditingBlog(null);
      toast({
        title: "Blog Updated",
        description: "The blog has been updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to update blog",
        variant: "destructive",
      });
    }
  });

  // Add mutation for deleting a blog
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete blog');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Refetch blogs after successful deletion
      if (sector) {
        queryClient.invalidateQueries({ queryKey: [`/api/blogs/sector/${sector}`] });
      }
      setIsDeleteDialogOpen(false);
      setBlogToDelete(null);
      toast({
        title: "Blog Deleted",
        description: "The blog has been deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog",
        variant: "destructive",
      });
    }
  });

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
  };

  const handleDeleteBlog = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      updateBlogMutation.mutate(editingBlog);
    }
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteBlogMutation.mutate(blogToDelete.id);
    }
  };

  const capitalizedSector = sector?.charAt(0).toUpperCase() + sector?.slice(1);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#dfdefd] to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {capitalizedSector} Blogs
          </h1>
          <p className="text-xl text-gray-600">
            Latest insights and trends in {capitalizedSector}
          </p>
          
          {/* Add Generate Blog button */}
          <Button 
            onClick={() => generateBlogMutation.mutate()}
            disabled={generateBlogMutation.isPending}
            className="mt-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            {generateBlogMutation.isPending ? 'Generating...' : 'Generate New Blog'}
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-2">Loading blogs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold">{blog.title}</h2>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditBlog(blog)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteBlog(blog)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                    </div>
                    {blog.author && (
                      <p className="text-sm text-gray-500 italic">By {blog.author}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{blog.snippet}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/post/${blog.id}`}>
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Blog Dialog */}
      {editingBlog && (
        <Dialog open={!!editingBlog} onOpenChange={(open) => !open && setEditingBlog(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Blog</DialogTitle>
              <DialogDescription>
                Make changes to the blog post. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateBlog}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editingBlog.author || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="snippet">Snippet</Label>
                  <Textarea
                    id="snippet"
                    value={editingBlog.snippet}
                    onChange={(e) => setEditingBlog({ ...editingBlog, snippet: e.target.value })}
                    rows={2}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    rows={10}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingBlog(null)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={updateBlogMutation.isPending}
                >
                  {updateBlogMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteBlogMutation.isPending}
            >
              {deleteBlogMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
