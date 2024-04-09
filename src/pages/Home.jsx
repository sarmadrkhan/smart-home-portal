import React from 'react';
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const addSmartHome = () => {
    navigate("/add-smarthome")
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Hello 👋, Welcome to the Smart Home Portal</h1>
        <div onClick={addSmartHome} className={styles.iconContainer}>
          <i className="bi bi-house" style={{ fontSize: '5rem' }}></i>
          <i className={`bi bi-plus-circle-fill ${styles.plusIcon}`}></i>
        </div>
        <p className='h2'>Add a Home</p>
      </div>
    </div>
  )
}

export default Home;
