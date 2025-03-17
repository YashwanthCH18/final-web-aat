import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function BlogPost() {
  const { id } = useParams();
  
  const { data: blog, isLoading } = useQuery<Blog>({
    queryKey: [`/api/blogs/${id}`]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        Loading blog post...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        Blog post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#dfdefd] to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href={`/blog/${blog.sector.toLowerCase()}`}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {blog.sector} Blogs
            </Button>
          </Link>

          <Card>
            <CardContent className="p-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                {blog.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-6 text-gray-500 mb-8"
              >
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'No date'}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {blog.author}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="prose prose-lg max-w-none"
              >
                {blog.content.split('\n\n').map((section, sectionIndex) => {
                  // Check if the section is a list (starts with - or numbers)
                  if (section.trim().startsWith('-') || /^\d+\./.test(section.trim())) {
                    return (
                      <ul key={sectionIndex} className="list-disc pl-6 mb-4">
                        {section.split('\n').map((item, itemIndex) => (
                          <li key={itemIndex} className="mb-2">
                            {item.replace(/^[-•→\s]+/, '').trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  
                  // Regular paragraph
                  return (
                    <p key={sectionIndex} className="mb-4">
                      {section.trim()}
                    </p>
                  );
                })}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
