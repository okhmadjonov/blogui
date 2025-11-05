import Blog from "./components/blogs";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Blog />
    </div>
  );
};

export default Home;
