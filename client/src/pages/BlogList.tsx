import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function BlogList() {
  const { sector } = useParams();
  
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: [`/api/blogs/sector/${sector}`]
  });

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
        </motion.div>

        {isLoading ? (
          <div className="text-center">Loading blogs...</div>
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
                    <h2 className="text-2xl font-semibold">{blog.title}</h2>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
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
    </div>
  );
}
