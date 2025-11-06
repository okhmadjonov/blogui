import styles from "./BlogDetails.module.scss";
import { FiArrowLeft, FiMessageCircle, FiShare2, FiBookmark, FiHeart } from "react-icons/fi";

interface BlogDetailsProps {
  blog: {
    id: number;
    userImage: string;
    username: string;
    date: string;
    title: string;
    subtitle: string;
    fullText: string;
    comments: number;
    likes?: number;
    tags?: string[];
    readTime?: string;
  };
  onBack: () => void;
}

const BlogDetails = ({ blog, onBack }: BlogDetailsProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={styles.blogDetails}>
      <div className={styles.detailsHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft />
          Back to Blogs
        </button>
        
        <div className={styles.headerActions}>
          <button className={styles.actionButton} aria-label="Bookmark">
            <FiBookmark />
          </button>
          <button className={styles.actionButton} onClick={handleShare} aria-label="Share">
            <FiShare2 />
          </button>
        </div>
      </div>

      <article className={styles.detailsContent}>
        <header className={styles.detailsHeaderContent}>
          <div className={styles.author}>
            <img src={blog.userImage} alt={blog.username} />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{blog.username}</span>
              <div className={styles.meta}>
                <span className={styles.date}>{blog.date}</span>
                <span className={styles.readTime}>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className={styles.detailsTitle}>{blog.title}</h1>
          <p className={styles.detailsSubtitle}>{blog.subtitle}</p>

          {blog.tags && (
            <div className={styles.detailsTags}>
              {blog.tags.map((tag, index) => (
                <span key={index} className={styles.detailsTag}>{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.detailsBody}>
          <p>{blog.fullText}</p>
          <p>This is additional content that would normally come from your blog data. In a real application, this would be the complete article content with proper formatting, images, and other rich media elements.</p>
        </div>

        <footer className={styles.detailsFooter}>
          <div className={styles.detailsStats}>
            <div className={styles.stat}>
              <FiMessageCircle />
              <span>{blog.comments} Comments</span>
            </div>
            <div className={styles.stat}>
              <FiHeart />
              <span>{blog.likes} Likes</span>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetails;