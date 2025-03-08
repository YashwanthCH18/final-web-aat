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
        title: "The Future of EdTech: Revolutionizing Education Through Technology",
        content: 
    `INTRODUCTION:
    The landscape of education is rapidly evolving with modern technology at its core.
    Educational Technology (EdTech) is transforming traditional classrooms into dynamic, interactive learning environments that empower both students and educators.
    
    THE RISE OF EDTECH:
    Digital platforms have reshaped education by making learning more engaging, personalized, and accessible. Today's classrooms are increasingly incorporating:
      - Artificial Intelligence (AI): Tools that analyze student performance and tailor content to individual needs.
      - Virtual and Augmented Reality (VR/AR): Immersive experiences that bring abstract concepts to life.
      - Gamification: Game-based learning strategies that increase motivation and retention.
      - Cloud-Based Learning: Platforms that provide anytime, anywhere access to educational resources.
    
    INNOVATIVE TECHNOLOGIES DRIVING CHANGE:
    1. Artificial Intelligence (AI) and Machine Learning:
       AI enhances personalized learning and provides educators with valuable insights into student progress.
    2. Virtual and Augmented Reality (VR/AR):
       These technologies break conventional learning barriers by offering immersive simulations—imagine exploring historical sites or conducting virtual lab experiments!
    3. Gamification:
       Introducing game elements into education fosters a competitive and fun learning environment with badges, leaderboards, and challenges.
    4. Cloud Computing:
       Ensures on-demand access to educational content and facilitates remote learning and collaboration.
    
    BENEFITS AND CHALLENGES:
    Benefits:
      • Personalized Learning: Tailored experiences that cater to individual learning styles.
      • Increased Engagement: Interactive tools and immersive experiences boost student interest.
      • Wider Access: Technology enables education to reach remote and underserved communities.
    
    Challenges:
      • Digital Divide: Ensuring all students have equitable access to modern technology.
      • Data Security: Protecting sensitive student information as digital learning expands.
      • Teacher Training: Equipping educators with the necessary skills to integrate new technologies effectively.
    
    LOOKING AHEAD – THE FUTURE OUTLOOK:
    The future of EdTech holds immense promise. Emerging innovations will further enrich the learning experience by:
      • Creating more interactive and immersive classroom environments.
      • Utilizing data-driven insights to continuously refine educational content.
      • Promoting inclusivity and effectiveness through collaborative efforts among educators, policymakers, and technology developers.
    
    CONCLUSION:
    EdTech is not just a fleeting trend—it represents a revolution in education. By embracing cutting-edge tools like AI, VR, gamification, and cloud-based learning, educators can create a more engaging, personalized, and inclusive future for students worldwide. Overcoming challenges such as the digital divide and data security will be essential to fully unlock the potential of educational technology.`,
        snippet: "Exploring the latest innovations in educational technology, from AI to VR, and the challenges ahead.",
        sector: "Edtech",
        author: "John Doe"
      },
      {
        title: "EdTech Unleashed: Transforming Learning in the Digital Age",
        content: `
      INTRODUCTION:
      EdTech is revolutionizing education by blending traditional learning with innovative digital tools. This transformation is creating engaging, accessible, and personalized experiences for students across the globe.
      
      HISTORY AND EVOLUTION:
      The journey of EdTech has been marked by significant milestones:
        - Early Beginnings: Introduction of computers in classrooms paved the way for digital learning.
        - The Internet Era: E-learning platforms, online courses, and digital libraries expanded educational access.
        - Modern Innovations: Today’s classrooms feature interactive whiteboards, mobile apps, and virtual learning environments.
      
      CURRENT LANDSCAPE OF EDTECH:
      Modern educational technology is not merely an add-on but a critical element in redefining learning:
        • Online Learning Platforms: Massive Open Online Courses (MOOCs) and Learning Management Systems (LMS) provide flexible, self-paced education.
        • Personalized Learning: Adaptive technologies analyze student performance to tailor content, ensuring every learner gets a custom experience.
        • Collaborative Tools: Real-time communication apps foster global collaboration and peer-to-peer learning.
        • Gamification: Game elements such as points, badges, and leaderboards enhance motivation and engagement.
      
      EMERGING TRENDS:
      The future of EdTech is being shaped by cutting-edge innovations:
        - Artificial Intelligence: AI-driven tutoring systems and predictive analytics are making learning more efficient.
        - Virtual and Augmented Reality: Immersive VR/AR experiences are turning abstract concepts into tangible, interactive lessons.
        - Blockchain for Education: Securely managing academic credentials and student records through blockchain technology.
        - Big Data and Learning Analytics: Harnessing data to identify trends, measure outcomes, and improve teaching strategies.
        - Hybrid Learning Models: Combining online and in-person education to offer flexible, adaptable learning environments.
      
      BENEFITS OF EDTECH:
      Embracing EdTech brings numerous advantages:
        • Increased Access: Digital tools break geographical and socio-economic barriers, bringing quality education to remote areas.
        • Enhanced Engagement: Interactive multimedia content transforms passive learning into an active, immersive experience.
        • Tailored Instruction: Adaptive learning platforms customize the educational journey to meet individual needs.
        • Efficient Administration: Automation and digital record-keeping streamline administrative tasks, allowing educators to focus on teaching.
        • Lifelong Learning: Continuous access to up-to-date resources supports ongoing professional development and personal growth.
      
      CHALLENGES AND CONSIDERATIONS:
      Despite its promise, EdTech faces several hurdles:
        • Digital Divide: Ensuring equal access to devices and high-speed internet for all students remains a critical challenge.
        • Data Privacy and Security: Safeguarding student information in digital environments is paramount.
        • Teacher Training: Educators require continuous professional development to effectively integrate new technologies.
        • Quality Assurance: With the proliferation of digital content, maintaining high educational standards is essential.
        • Infrastructure Costs: Initial investments in technology can be significant, particularly in underfunded regions.
      
      CASE STUDIES:
      Numerous institutions have successfully harnessed EdTech to transform learning:
        • Khan Academy: Revolutionizing free, online education with interactive exercises and video lessons.
        • Coursera and edX: Democratizing higher education by offering courses from top universities worldwide.
        • Google for Education: Equipping classrooms with tools like Chromebooks and G Suite to foster collaborative learning.
        • BYJU'S: Leveraging technology to provide personalized learning experiences in emerging markets.
      
      FUTURE OUTLOOK:
      The evolution of EdTech is set to continue:
        - Increased Integration: As technologies converge, the future classroom will be a seamless blend of digital and physical learning environments.
        - Focus on Inclusivity: Enhanced connectivity and affordable technology will bridge educational gaps across diverse communities.
        - Continuous Innovation: Ongoing advancements in AI, VR/AR, and blockchain will further refine the educational experience.
        - Global Collaboration: Partnerships between governments, educators, and tech companies will drive the creation of a more accessible, quality education system.
      
      CONCLUSION:
      EdTech is not just a technological trend—it is a transformative movement reshaping education. By breaking down traditional barriers and embracing digital innovation, educators can provide a richer, more personalized learning experience. The future of education lies in leveraging these technologies to empower every learner, ensuring that quality education is a universal right in the digital age.
        `,
        snippet: "Discover how EdTech is revolutionizing education by breaking barriers and personalizing learning for every student.",
        sector: "Edtech",
        author: "John Doe"
      },
      
    
      {
          title: "The FinTech Revolution: Transforming the Financial Landscape",
          content: 
      `INTRODUCTION:
      Financial Technology (FinTech) is revolutionizing the way individuals, businesses, and financial institutions interact with money. From digital payments to blockchain-powered transactions, FinTech has disrupted traditional banking, making financial services faster, more accessible, and more secure.
      
      THE RISE OF FINTECH:
      FinTech has emerged as a key driver of financial inclusion and innovation. With rapid advancements in mobile technology, artificial intelligence, and blockchain, the financial sector is undergoing a massive transformation. The rise of digital-only banks, automated investing platforms, and contactless payments has reshaped consumer expectations.
      
      KEY TECHNOLOGIES DRIVING FINTECH:
      1. **Digital Payments & Mobile Wallets:**  
         - Services like PayPal, Google Pay, and Apple Pay have made transactions faster and more convenient.  
         - Contactless payments and QR code transactions are reducing the need for physical cash.  
      
      2. **Blockchain & Cryptocurrencies:**  
         - Decentralized finance (DeFi) is enabling peer-to-peer transactions without intermediaries.  
         - Cryptocurrencies like Bitcoin and Ethereum are gaining traction as alternative investment assets.  
      
      3. **Artificial Intelligence & Machine Learning:**  
         - AI-powered chatbots are enhancing customer service in banking and finance.  
         - Machine learning algorithms help detect fraudulent transactions in real time.  
      
      4. **Robo-Advisors & Automated Investing:**  
         - AI-driven investment platforms provide users with personalized portfolio management.  
         - Automated trading bots execute trades based on data analysis and market trends.  
      
      BENEFITS AND CHALLENGES OF FINTECH:  
      **Benefits:**  
      • Faster and more efficient financial transactions.  
      • Increased financial inclusion for the unbanked population.  
      • Enhanced security through AI-based fraud detection.  
      • Lower transaction fees compared to traditional banking.  
      
      **Challenges:**  
      • Regulatory hurdles and compliance issues.  
      • Cybersecurity threats and data breaches.  
      • Resistance from traditional financial institutions.  
      • Customer trust in digital-only financial solutions.  
      
      THE FUTURE OF FINTECH:  
      FinTech is expected to continue evolving, with trends such as:  
      • **Central Bank Digital Currencies (CBDCs):** Governments exploring digital versions of national currencies.  
      • **Embedded Finance:** Financial services being integrated into non-financial platforms (e.g., e-commerce).  
      • **Decentralized Finance (DeFi):** More users adopting blockchain-based financial services.  
      • **AI-Powered Risk Management:** Better fraud prevention and financial forecasting.  
      
      CONCLUSION:  
      The FinTech revolution is reshaping global finance, making transactions faster, more secure, and more inclusive. As technology continues to advance, FinTech will play a critical role in defining the future of banking, investing, and financial services. However, regulatory challenges and cybersecurity concerns must be addressed to ensure sustainable growth in the industry.`,
          snippet: "How digital payments and blockchain are reshaping financial services.",
          sector: "Fintech",
          author: "Jane Smith"
        },

        {
          title: "FinTech Revolution: How Digital Payments are Changing the Financial Landscape",
          content: 
        `INTRODUCTION:
        In today's digital era, financial technology is reshaping the way we manage money and interact with financial services. FinTech, short for Financial Technology, is at the forefront of this change, driving innovation through digital payments, blockchain, and AI-powered solutions.
        
        THE RISE OF FINTECH:
        FinTech is more than just a buzzword—it's a revolution. Key drivers include:
          - Digital Payments: Enabling instant, secure, and contactless transactions.
          - Blockchain Technology: Offering transparent and tamper-proof ledger systems that reduce fraud.
          - Artificial Intelligence: Delivering personalized financial advice and enhanced customer service.
          - Peer-to-Peer Lending: Streamlining the borrowing process by directly connecting lenders with borrowers.
        
        IMPACT ON TRADITIONAL BANKING:
        Traditional banks are feeling the pressure as FinTech innovations gain ground. To stay competitive, they are:
          - Integrating new technologies to improve the customer experience.
          - Partnering with FinTech startups to broaden their range of services.
          - Enhancing data security measures to protect sensitive financial information.
        
        FUTURE TRENDS IN FINTECH:
        The FinTech landscape continues to evolve, with several trends on the horizon:
          - Enhanced Mobile Banking: Making financial services accessible anytime and anywhere.
          - Regulatory Technology (RegTech): Simplifying compliance and risk management.
          - Decentralized Finance (DeFi): Utilizing blockchain to create a more open and transparent financial ecosystem.
          - Biometric Security: Implementing fingerprint and facial recognition to bolster transaction security.
        
        CHALLENGES AND OPPORTUNITIES:
        While FinTech offers numerous benefits, it also faces challenges:
          - Regulatory Hurdles: Navigating complex legal frameworks and ensuring compliance.
          - Cybersecurity Risks: Protecting against sophisticated cyber threats in an increasingly digital world.
          - Building Customer Trust: Establishing reliability and confidence in digital financial services.
        Despite these challenges, FinTech holds immense potential to drive innovation and promote financial inclusion globally.
        
        CONCLUSION:
        The FinTech revolution is transforming the financial landscape, making transactions faster, more secure, and more efficient. As digital payments and emerging technologies continue to evolve, they will play a crucial role in shaping the future of finance, benefiting both consumers and the industry as a whole.`,
          snippet: "How digital payments and emerging technologies are revolutionizing the financial landscape.",
          sector: "Fintech",
          author: "Jane Smith"
        },

        {
          title: "SaaS: Unlocking the Future of Software Delivery",
          content: `
        INTRODUCTION:
        Software as a Service (SaaS) has revolutionized the way businesses access, manage, and utilize software. Moving away from traditional on-premise installations, SaaS offers a subscription-based model that provides flexibility, scalability, and cost efficiency. This paradigm shift allows companies to focus on core business activities while relying on cloud-based applications to streamline operations.
        
        THE EVOLUTION OF SAAS:
        Over the past decade, SaaS has evolved from a niche offering to a mainstream solution. The key drivers behind this transformation include:
          - Scalability: Businesses can quickly adjust their usage based on demand, ensuring they only pay for what they need.
          - Cost Efficiency: Eliminates the need for large upfront investments in hardware and software licenses.
          - Rapid Deployment: SaaS solutions are typically fast to deploy, reducing time-to-value.
          - Continuous Innovation: Providers frequently update their applications, delivering the latest features and security improvements without disruption.
        
        BUSINESS IMPACT:
        SaaS solutions have had a profound impact on business operations:
          • Enhanced Agility: Organizations can rapidly adapt to changing market conditions with flexible software solutions.
          • Improved Collaboration: Cloud-based tools facilitate seamless teamwork across geographies.
          • Data-Driven Decisions: Integrated analytics and reporting empower businesses to make informed decisions.
          • Operational Efficiency: Automation and streamlined processes reduce manual workloads and increase productivity.
        
        INTEGRATION AND CUSTOMIZATION:
        Modern SaaS platforms are designed for seamless integration and customization:
          - API-Driven Connectivity: Robust APIs allow businesses to integrate SaaS applications with existing systems.
          - Customizable Platforms: Many SaaS products offer extensive customization options to meet unique business needs.
          - Ecosystem Expansion: Third-party plugins and add-ons further enhance functionality, creating a versatile software ecosystem.
        
        SECURITY AND COMPLIANCE:
        Data security remains a top priority for SaaS providers:
          • Advanced Encryption: State-of-the-art encryption methods protect sensitive information both in transit and at rest.
          • Regulatory Compliance: SaaS applications adhere to industry standards and regulations such as GDPR, HIPAA, and PCI-DSS.
          • Continuous Monitoring: Real-time monitoring and automated threat detection help safeguard against cyberattacks.
          • Disaster Recovery: Reliable backup and recovery solutions ensure business continuity in the event of an incident.
        
        EMERGING TRENDS IN SAAS:
        The future of SaaS is marked by rapid innovation and emerging trends:
          - Artificial Intelligence: AI-powered features are being integrated to optimize workflows and enhance user experiences.
          - Vertical SaaS: Industry-specific solutions are gaining traction, offering tailored functionalities for sectors like healthcare, finance, and retail.
          - Edge Computing: The integration of edge computing reduces latency and improves performance for real-time applications.
          - Microservices Architecture: This modern architectural approach enables greater flexibility and faster deployment of new features.
        
        CASE STUDIES:
        Numerous companies have successfully leveraged SaaS to transform their operations:
          • CRM Platforms: Salesforce has set the benchmark for cloud-based customer relationship management.
          • Collaboration Tools: Slack and Microsoft Teams have redefined workplace communication, enabling real-time collaboration.
          • E-commerce Solutions: Platforms like Shopify empower businesses to manage online stores efficiently, with integrated payment and analytics.
          • HR and Payroll Systems: SaaS-based HR solutions streamline recruitment, employee management, and payroll processing.
        
        CONCLUSION:
        The SaaS model is more than just a technological shift—it's a strategic enabler for businesses looking to thrive in a digital-first world. With its inherent scalability, cost-effectiveness, and commitment to continuous innovation, SaaS empowers organizations to optimize their operations and drive growth. As the market continues to evolve, adopting SaaS solutions will be crucial for businesses aiming to maintain a competitive edge in today’s rapidly changing landscape.
          `,
          snippet: "Unlocking the future of software delivery with scalable, secure, and innovative SaaS solutions.",
          sector: "SaaS",
          author: "Jane Smith"
        },
        
        {
          title: "SaaS Revolution: Transforming Business with Cloud-Based Solutions",
          content: `
        INTRODUCTION:
        Software as a Service (SaaS) is transforming the way businesses access and utilize software. By offering applications over the internet, SaaS eliminates the need for local installations, providing scalable, cost-effective, and easily accessible solutions for companies of all sizes.
        
        THE EVOLUTION OF SAAS:
        Over the past decade, the SaaS model has evolved from a niche offering to a mainstream solution, driven by:
          - Subscription-Based Pricing: Reducing upfront costs and providing flexible payment options.
          - Cloud Computing: Enabling remote access, seamless updates, and centralized management.
          - Scalability: Allowing businesses to adjust their usage according to demand without significant infrastructure investments.
          - Integration and Collaboration: Facilitating better integration with other cloud-based tools to enhance overall productivity.
        
        KEY BENEFITS OF SAAS:
        Adopting SaaS brings a multitude of advantages:
        • Cost Efficiency: Eliminates the need for expensive hardware and software licenses.
        • Accessibility: Provides anytime, anywhere access to business applications.
        • Automatic Updates: Ensures that software is always up-to-date with the latest features and security patches.
        • Flexibility: Supports rapid scaling to match business growth or seasonal demand.
        
        CHALLENGES AND CONSIDERATIONS:
        While SaaS offers considerable benefits, there are challenges that companies need to address:
        • Data Security: Protecting sensitive information stored in the cloud.
        • Vendor Dependence: Relying on the provider for uptime, support, and continuous innovation.
        • Customization: Balancing the standardized features of SaaS with specific business requirements.
        • Integration: Seamlessly connecting SaaS applications with existing legacy systems.
        
        FUTURE TRENDS IN SAAS:
        The future of SaaS is set to be even more dynamic, with trends including:
        • Artificial Intelligence and Automation: Enhancing user experience through predictive analytics and automated processes.
        • Vertical SaaS: Developing industry-specific solutions that cater to niche market needs.
        • Enhanced Data Analytics: Leveraging big data to provide deeper business insights.
        • Strengthened Security Measures: Continuously improving security protocols to safeguard cloud data.
        
        CONCLUSION:
        The SaaS revolution is not just a technological trend—it's a strategic shift that is redefining business operations. By embracing cloud-based solutions, companies can enjoy increased agility, reduced costs, and the ability to scale rapidly. As SaaS continues to evolve, businesses that adopt these solutions will be well-positioned to thrive in the digital age.
          `,
          snippet: "Transforming business with flexible, scalable, and cost-effective cloud-based solutions.",
          sector: "SAAS",
          author: "Jane Smith"
        },
        
        {
          title: "Social Media: The Pulse of the Modern World",
          content: `
        INTRODUCTION:
        Social media has revolutionized how we connect, communicate, and consume information. Platforms such as Facebook, Twitter, Instagram, and TikTok are now integral parts of our daily lives, influencing personal relationships, business strategies, and even societal trends.
        
        THE EVOLUTION OF SOCIAL MEDIA:
        The journey of social media spans from simple online forums to today's multifaceted platforms:
          - Early Days: Internet forums and chat rooms set the stage for online interactions.
          - Mainstream Adoption: Platforms like Facebook and Twitter transformed the way we share our lives and news in real time.
          - Visual Revolution: Instagram and TikTok introduced visual storytelling, redefining content consumption.
          - Professional Networking: LinkedIn and similar platforms created spaces for career development and business networking.
        
        IMPACT ON SOCIETY AND BUSINESS:
        Social media’s influence extends across various domains:
          • Communication: Enables instant, global connectivity, breaking down geographical barriers.
          • Marketing & Branding: Businesses harness these platforms for targeted advertising, customer engagement, and brand building.
          • Information Sharing: Social networks have become major channels for news dissemination and public discourse.
          • Community Building: From hobby groups to social movements, online communities are empowering users to rally around shared interests.
        
        CHALLENGES AND RISKS:
        Despite its advantages, social media also presents significant challenges:
          • Privacy Concerns: User data collection and targeted advertising raise serious privacy issues.
          • Misinformation: The rapid spread of unverified information can distort public opinion and lead to real-world consequences.
          • Cyberbullying & Online Harassment: Social platforms sometimes become arenas for harmful behavior, affecting mental health.
          • Digital Addiction: The constant engagement and exposure can contribute to issues like screen addiction and reduced productivity.
        
        FUTURE TRENDS:
        Looking ahead, social media is poised for further transformation:
          • Enhanced Personalization: AI-driven algorithms will offer even more tailored content experiences.
          • Regulatory Evolution: Increased oversight and policy changes may enhance transparency and data protection.
          • Immersive Experiences: The integration of AR and VR technologies will create richer, more interactive social environments.
          • Commerce Integration: Social platforms are increasingly merging with e-commerce, allowing seamless shopping experiences directly within apps.
        
        CONCLUSION:
        Social media is more than a tool for communication—it is a powerful driver of cultural and business evolution. As platforms continue to innovate, striking a balance between user empowerment and responsible practices will be essential to ensure that social media remains a positive force in our global society.
          `,
          snippet: "How social media shapes communication, culture, and business in the modern era.",
          sector: "Social Media",
          author: "Taylor Reed"
        },
        
        {
          title: "Social Media : Empowering Communities in a Connected World",
          content: `
        INTRODUCTION:
        The evolution of social media continues to reshape how we interact, collaborate, and build communities. As we enter the era of Social Media 2.0, these platforms are moving beyond simple communication to foster engagement, creativity, and social impact.
        
        THE CHANGING LANDSCAPE:
        Social media is no longer just a tool for personal expression. Today, it serves as a catalyst for social movements, public discourse, and cultural transformation. Key developments include:
          - The rise of micro-communities and niche networks.
          - Enhanced user interactivity through live streaming and real-time discussions.
          - Integration of multimedia content, blending video, audio, and interactive graphics.
        
        THE ROLE OF INFLUENCERS AND CREATORS:
        Influencers and content creators are at the forefront of this digital revolution:
          • They build authentic connections with audiences.
          • They drive trends and shape public opinion.
          • They leverage data and analytics to optimize content for better engagement.
        
        BUSINESS IMPACT AND SOCIAL COMMERCE:
        Companies are increasingly turning to social media as a critical component of their marketing strategy. Benefits include:
          • Direct engagement with consumers through interactive campaigns.
          • Seamless integration of shopping features within social platforms.
          • Real-time feedback that helps brands adapt to market needs swiftly.
        
        CHALLENGES AND RESPONSIBILITY:
        Despite its benefits, social media also brings challenges:
          • Ensuring user privacy and data security.
          • Combating the spread of misinformation and fake news.
          • Addressing the issues of cyberbullying and online harassment.
        
        LOOKING FORWARD:
        The future of Social Media 2.0 is bright, with emerging trends set to enhance user experiences and foster deeper community connections:
          • Advanced AI algorithms for personalized content discovery.
          • Augmented reality features for immersive social interactions.
          • Greater emphasis on digital wellness and mental health support.
        
        CONCLUSION:
        Social Media 2.0 is more than just a technological upgrade—it represents a shift towards a more connected and engaged world. As these platforms continue to evolve, they will play a pivotal role in shaping social narratives, driving innovation, and empowering communities to thrive in the digital age.
          `,
          snippet: "Discover how Social Media 2.0 is transforming interactions and empowering communities in the digital era.",
          sector: "Social Media",
          author: "Alex Johnson"
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
