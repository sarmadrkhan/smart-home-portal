import React from 'react'
import styles from "./UnderConstruction.module.css"

const UnderConstruction = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        🚧⚠🚧
      </h1>
      <p className={styles.text}>Under Construction...</p>
      <span className={styles.logo}>🔨</span>
    </div>
  )
}

export default UnderConstruction