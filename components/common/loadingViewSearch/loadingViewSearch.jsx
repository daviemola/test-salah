import React from "react";
import styles from "./loadingView.module.css";
const LoadingView = () => {
  return (
    <div className={styles.loading_view}>
      <span
        className={styles.loading_view_title}
        style={{ color: "#fff", fontSize: "20px" }}
      >
        Loading Products...
      </span>
    </div>
  );
};
export default LoadingView;
