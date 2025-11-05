import styles from "./Blog.module.scss";
import { FiMessageCircle } from "react-icons/fi";
import { useState } from "react";
import BlogDetails from "./details";
import UserImage from "../../../../assets/images/user.png";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  const blogs = [
    {
      id: 1,
      userImage: UserImage,
      username: "admin",
      date: "Oct 30, 2025",
      title: "Building a Modern Web App with React and .NET",
      subtitle: "How to create scalable full-stack apps",
      body: "Learn how to structure, build, and deploy full-stack apps using React for the frontend and .NET for the backend with modern tooling and clean architecture...",
      comments: 12,
      fullText:
        "This is the complete article explaining the process of building modern web applications with React and .NET, covering architecture, performance, deployment, and best practices.",
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
      fullText:
        "Clean Architecture focuses on maintainability and testability. Here we dive into its use in .NET applications, including use cases, dependency inversion, and domain-driven design.",
    },
    {
      id: 3,
      userImage: UserImage,
      username: "admin",
      date: "Oct 29, 2025",
      title: "Understanding Clean Architecture in .NET",
      subtitle: "A practical guide for developers",
      body: "Clean Architecture helps separate concerns and improve maintainability. In this article, we explore the main layers and best practices to implement it effectively...",
      comments: 8,
      fullText:
        "Clean Architecture focuses on maintainability and testability. Here we dive into its use in .NET applications, including use cases, dependency inversion, and domain-driven design.",
    },
  ];

  const selected = blogs.find((b) => b.id === selectedBlog);

  return (
    <div className={styles.blog}>
      {!selected ? (
        blogs.map((b) => (
          <div key={b.id} className={styles.card}>
            <div className={styles.user}>
              <img src={b.userImage} alt={b.username} />
              <div className={styles.userInfo}>
                <span className={styles.username}>{b.username}</span>
                <span className={styles.date}>{b.date}</span>
              </div>
            </div>
            <h2 className={styles.title} onClick={() => setSelectedBlog(b.id)}>
              {b.title}
            </h2>
            <div className={styles.footer}>
              <FiMessageCircle className={styles.icon} />
              <span className={styles.comments}>{b.comments}</span>
            </div>
          </div>
        ))
      ) : (
        <BlogDetails blog={selected} onBack={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default Blog;
