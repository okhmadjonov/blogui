import { useState, useEffect } from "react";
import styles from "./Blog.module.scss";
import { FiMessageCircle, FiShare2, FiBookmark } from "react-icons/fi";
import { FaRegCommentAlt } from "react-icons/fa";
import BlogDetails from "./details";
import UserImage from "../../../../assets/images/user.png";

interface Blog {
  id: number;
  userImage: string;
  username: string;
  date: string;
  title: string;
  subtitle: string;
  body: string;
  comments: number;
  fullText: string;
  likes?: number;
  tags?: string[];
  readTime?: string;
}

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const blogs: Blog[] = [
    {
      id: 1,
      userImage: UserImage,
      username: "admin",
      date: "Oct 30, 2025",
      title: "Building a Modern Web App with React and .NET",
      subtitle: "How to create scalable full-stack apps",
      body: "Learn how to structure, build, and deploy full-stack apps using React for the frontend and .NET for the backend with modern tooling and clean architecture...",
      comments: 12,
      likes: 24,
      readTime: "8 min read",
      tags: ["React", ".NET", "Full-Stack"],
      fullText:
        "This is the complete article explaining the process of building modern web applications with React and .NET, covering architecture, performance, deployment, and best practices. We'll explore how to set up the development environment, configure the backend API, and build responsive frontend components that work seamlessly together.",
    },
    {
      id: 2,
      userImage: UserImage,
      username: "admin",
      date: "Oct 29, 2025",
      title: "Understanding Clean Architecture in .NET",
      subtitle: "A practical guide for developers",
      body: "Clean Architecture helps separate concerns and improve maintainability. In this article, we explore the main layers and best practices to implement it effectively...",
      comments: 8,
      likes: 15,
      readTime: "6 min read",
      tags: [".NET", "Architecture"],
      fullText:
        "Clean Architecture focuses on maintainability and testability. Here we dive into its use in .NET applications, including use cases, dependency inversion, and domain-driven design. We'll cover the core principles, implementation strategies, and common pitfalls to avoid when building enterprise applications.",
    },
    {
      id: 3,
      userImage: UserImage,
      username: "developer",
      date: "Oct 28, 2025",
      title: "Advanced React Patterns for 2025",
      subtitle: "Master modern React development",
      body: "Discover the latest React patterns and best practices that will help you build more maintainable and performant applications in the coming year...",
      comments: 15,
      likes: 32,
      readTime: "10 min read",
      tags: ["React", "JavaScript", "Patterns"],
      fullText:
        "React continues to evolve with new patterns and best practices. In this comprehensive guide, we explore advanced techniques including compound components, custom hooks, state management strategies, and performance optimization methods that will define React development in 2025.",
    },
    {
      id: 4,
      userImage: UserImage,
      username: "architect",
      date: "Oct 27, 2025",
      title: "Microservices with Docker and Kubernetes",
      subtitle: "Scalable infrastructure patterns",
      body: "Learn how to design, deploy, and manage microservices architecture using Docker containers and Kubernetes orchestration...",
      comments: 6,
      likes: 18,
      readTime: "12 min read",
      tags: ["Docker", "Kubernetes", "DevOps"],
      fullText:
        "Microservices architecture has become the standard for building scalable applications. This article covers everything from service decomposition and API design to containerization with Docker and orchestration with Kubernetes, including monitoring and scaling strategies.",
    },
  ];

  const selected = blogs.find((b) => b.id === selectedBlog);

  const handleBlogClick = (blogId: number) => {
    setSelectedBlog(blogId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackClick = () => {
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = (blog: Blog, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.subtitle,
        url: window.location.href + `?blog=${blog.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `?blog=${blog.id}`);
    }
  };

  const handleBookmark = (_blogId: number, e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (selected) {
    return <BlogDetails blog={selected} onBack={handleBackClick} />;
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blog}>
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className={styles.card}
            onClick={() => handleBlogClick(blog.id)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.user}>
                <img src={blog.userImage} alt={blog.username} />
                <div className={styles.userInfo}>
                  <span className={styles.username}>{blog.username}</span>
                  <span className={styles.date}>{blog.date}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={(e) => handleBookmark(blog.id, e)}
                  aria-label="Bookmark"
                >
                  <FiBookmark />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={(e) => handleShare(blog, e)}
                  aria-label="Share"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className={styles.cardContent}>
              <h2 className={styles.title}>{blog.title}</h2>
              <p className={styles.subtitle}>{blog.subtitle}</p>
              <p className={styles.body}>{blog.body}</p>

              <div className={styles.tags}>
                {blog.tags?.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.metaInfo}>
                <span className={styles.readTime}>{blog.readTime}</span>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <FiMessageCircle className={styles.icon} />
                    <span className={styles.count}>{blog.comments}</span>
                  </div>
                  <div className={styles.stat}>
                    <FaRegCommentAlt className={styles.icon} />
                    <span className={styles.count}>{blog.likes}</span>
                  </div>
                </div>
              </div>
              <button className={styles.readMore}>Read More</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
