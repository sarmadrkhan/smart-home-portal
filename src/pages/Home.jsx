import React from 'react';
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Hello 👋, Welcome to the Smart Home Portal</h1>
      </div>
    </div>
  )
}

export default Home;
