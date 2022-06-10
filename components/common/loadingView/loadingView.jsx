import React from "react";
import styles from "./loadingView.module.css";
const LoadingView = () => {
  return (
    <div className={styles.loading_view}>
       <span className={styles.loading_view_title}>Searching Products...</span>
    </div>
  )
};
export default LoadingView;
