// BlogDetails.tsx
import styles from "./BlogDetails.module.scss"

interface BlogDetailsProps {
  blog: {
    userImage: string
    username: string
    date: string
    title: string
    subtitle: string
    fullText: string
  }
  onBack: () => void
}

const BlogDetails = ({ blog, onBack }: BlogDetailsProps) => {
  return (
    <div className={styles.blogdetails}>
      <button className={styles.back} onClick={onBack}>← back</button>
      <div className={styles.header}>
        <img src={blog.userImage} alt={blog.username} />
        <div className={styles.info}>
          <span className={styles.username}>{blog.username}</span>
          <span className={styles.date}>{blog.date}</span>
        </div>
      </div>
      <h1 className={styles.title}>{blog.title}</h1>
      <h2 className={styles.subtitle}>{blog.subtitle}</h2>
      <p className={styles.text}>{blog.fullText}</p>
   
    </div>
  )
}

export default BlogDetails
