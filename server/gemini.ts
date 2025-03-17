import { GoogleGenerativeAI } from "@google/generative-ai";
import { storage } from "./storage";

// Function to check if API key is configured
export function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 0;
}

// Function to generate blog content for a specific sector
export async function generateBlogContent(sector: string): Promise<{
  title: string;
  content: string;
  snippet: string;
  author: string;
}> {
  // Check if API key is configured
  if (!isGeminiConfigured()) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.");
  }

  try {
    console.log(`Using API key: ${process.env.GEMINI_API_KEY?.substring(0, 5)}...`);
    
    // Get existing blog titles for this sector to avoid duplicates
    const existingBlogs = await storage.getBlogsBySector(sector);
    const existingTitles = existingBlogs.map(blog => blog.title);
    
    // Initialize the Gemini API with your API key from environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a prompt for the blog based on the sector with instructions for formatting
    const prompt = `You are a professional content writer and industry expert. Generate a high-quality, engaging blog post about the latest trends and innovations in ${sector}.

    IMPORTANT REQUIREMENTS:
    1. Create a unique, attention-grabbing title that has NOT been used before. Avoid these existing titles: ${existingTitles.join(", ")}
    2. The blog MUST be at least 600 words long and should be comprehensive and professionally written.
    3. Structure the content with clear sections using proper spacing and formatting.
    4. Include at least 5-6 main sections with relevant subsections.
    5. Each section should be well-developed with specific examples, data, or case studies.
    6. Use bullet points and numbered lists where appropriate.
    7. Include a compelling introduction and conclusion.
    8. Write a concise but engaging snippet (2-3 sentences) that captures the main value proposition.
    9. Create a professional author name with relevant credentials.
    10. Make the content unique and specific to ${sector} with real examples and trends.
    11. Include specific statistics, numbers, or data points where relevant.
    12. Use professional industry terminology and jargon appropriately.
<<<<<<< HEAD
    13. IMPORTANT: Format paragraphs with double line breaks (\\n\\n) between them for proper spacing.
    14. Each paragraph should be 3-5 sentences long for optimal readability.
    15. Use single line breaks (\\n) for lists and subsections.
=======
>>>>>>> d9d3e8fb9067f23cfe8d92d0dee4cf661f91b486
    
    SUGGESTED STRUCTURE (adapt based on ${sector}):
    - Introduction (Overview of the topic and its importance in ${sector})
    - Current Market Analysis (Latest developments, market size, and key players)
    - Emerging Technologies and Innovations (Specific examples and breakthroughs)
    - Industry Challenges and Solutions (Current problems and their solutions)
    - Future Trends and Predictions (What's next for ${sector})
    - Best Practices and Recommendations
    - Conclusion (Summary and call to action)
    
    Format your response as clean JSON with the following structure:
    {
      "title": "Your Unique Blog Title",
<<<<<<< HEAD
      "content": "The full content with proper spacing and structure. Use double line breaks (\\n\\n) between paragraphs and single line breaks (\\n) for lists and subsections.",
=======
      "content": "The full content with proper spacing and structure. Use double line breaks between sections and single line breaks between paragraphs. Each section should be detailed and well-developed.",
>>>>>>> d9d3e8fb9067f23cfe8d92d0dee4cf661f91b486
      "snippet": "A compelling 2-3 sentence summary of the blog's main value proposition",
      "author": "Author Name, Professional Title"
    }
    
    DO NOT include any markdown symbols (#, *, etc.) in your response. Return ONLY the clean JSON object.
    
    Remember to:
    - Make the content specific to ${sector}
    - Include real examples and case studies
    - Use industry-specific terminology
    - Provide actionable insights
    - Keep the tone professional but engaging
<<<<<<< HEAD
    - Ensure each section is well-developed with at least 100 words
    - Use proper paragraph spacing with double line breaks`;
=======
    - Ensure each section is well-developed with at least 100 words`;
>>>>>>> d9d3e8fb9067f23cfe8d92d0dee4cf661f91b486

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up any potential markdown code block markers
    const cleanedText = text.replace(/```json|```/g, '').trim();
    
    // Parse the JSON response
    try {
      const blogData = JSON.parse(cleanedText);
      
      // Validate the blog data
      if (!blogData.title || !blogData.content || !blogData.snippet || !blogData.author) {
        throw new Error("Missing required fields in blog data");
      }
      
      // Format the content to ensure it's properly displayed
      const formattedContent = blogData.content
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/#{1,6}\s/g, '') // Remove markdown headings
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, '') // Remove italic
        .replace(/`/g, '') // Remove code
        .replace(/\n{3,}/g, '\n\n') // Normalize multiple line breaks to double line breaks
        .replace(/\s*:\s*/g, ': ') // Normalize colons
        .replace(/\s*-\s*/g, '- ') // Normalize bullet points
        .replace(/\s*•\s*/g, '- ') // Convert bullet points
        .replace(/\s*→\s*/g, '- ') // Convert arrows
<<<<<<< HEAD
=======
        .replace(/\s*→\s*/g, '- ') // Convert arrows
>>>>>>> d9d3e8fb9067f23cfe8d92d0dee4cf661f91b486
        .replace(/\s*\[.*?\]/g, '') // Remove markdown links
        .replace(/\s*\(.*?\)/g, '') // Remove markdown link text
        .replace(/\s*>\s*/g, '') // Remove blockquotes
        .replace(/\s*_\s*/g, '') // Remove underscores
        .replace(/\s*~\s*/g, '') // Remove strikethrough
        .replace(/\s*`\s*/g, '') // Remove inline code
        .replace(/\s*\[x\]\s*/g, '') // Remove checkboxes
        .replace(/\s*\[ \]\s*/g, '') // Remove unchecked boxes
        .replace(/\s*\[\^.*?\]/g, '') // Remove footnotes
        .replace(/\s*\{\^.*?\}/g, '') // Remove footnote references
        .replace(/\s*\|.*?\|/g, '') // Remove table cells
        .replace(/\s*---\s*/g, '') // Remove horizontal rules
        .replace(/\s*===\s*/g, '') // Remove horizontal rules
        .replace(/\s*\+\s*/g, '') // Remove plus signs
        .replace(/\s*#\s*/g, '') // Remove hash symbols
        .replace(/\s*@\s*/g, '') // Remove at symbols
        .replace(/\s*&\s*/g, 'and') // Replace ampersands
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/\n\s*\n/g, '\n\n') // Normalize paragraph breaks
        .trim();
      
      // Validate content length
      const wordCount = formattedContent.split(/\s+/).length;
      if (wordCount < 600) {
        throw new Error("Generated content is too short");
      }
      
      return {
        title: blogData.title,
        content: formattedContent,
        snippet: blogData.snippet,
        author: blogData.author
      };
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.log("Raw response:", cleanedText);
      
      // Create a fallback blog with proper structure
      const fallbackTitle = `The Future of ${sector}: Latest Trends and Innovations`;
      const fallbackContent = `Introduction

The ${sector} industry is undergoing significant transformation, driven by technological advancements and changing market dynamics. In this comprehensive analysis, we explore the latest developments, challenges, and opportunities shaping the future of ${sector}.

Current Market Analysis

The ${sector} sector has experienced remarkable growth in recent years, with market size reaching unprecedented levels. Key players in the industry are driving innovation and setting new standards for excellence. Recent market data shows significant growth potential, with analysts predicting continued expansion in the coming years.

Emerging Technologies and Innovations

The landscape of ${sector} is being reshaped by cutting-edge technologies and breakthrough innovations. From artificial intelligence to advanced analytics, new tools and methodologies are revolutionizing how businesses operate in this space. Notable developments include:

- Advanced automation systems
- Predictive analytics platforms
- Integration of emerging technologies
- Enhanced security solutions

Industry Challenges and Solutions

While the ${sector} industry presents numerous opportunities, it also faces significant challenges. Key issues include:

1. Market volatility and uncertainty
2. Regulatory compliance requirements
3. Technological integration barriers
4. Talent acquisition and retention

However, innovative solutions are emerging to address these challenges, including:

- Advanced risk management systems
- Automated compliance tools
- Integrated technology platforms
- Enhanced training and development programs

Future Trends and Predictions

Looking ahead, several key trends are expected to shape the future of ${sector}:

- Increased adoption of AI and machine learning
- Greater focus on sustainability and environmental impact
- Enhanced customer experience through digital transformation
- Integration of blockchain and other emerging technologies

Best Practices and Recommendations

To succeed in the evolving ${sector} landscape, organizations should:

1. Invest in cutting-edge technology solutions
2. Prioritize employee training and development
3. Focus on customer-centric approaches
4. Implement robust security measures
5. Maintain compliance with industry regulations

Conclusion

The future of ${sector} holds immense potential, with ongoing developments promising to reshape the industry landscape. By staying informed about the latest trends and adopting best practices, organizations can position themselves for success in this dynamic environment.`;
      
      return {
        title: fallbackTitle,
        content: fallbackContent,
        snippet: `Explore the latest trends and innovations shaping the future of ${sector}, from emerging technologies to industry challenges and solutions.`,
        author: `Industry Expert, ${sector} Analyst`
      };
    }
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw new Error(`Failed to generate blog content for ${sector}`);
  }
}
