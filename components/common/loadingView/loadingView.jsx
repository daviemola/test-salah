import React from "react";
import styles from "./loadingView.module.css";

const LoadingView = () => {
  const [loading, setloading] = React.useState(true);

  //settimeout to simulate loading time
  React.useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 250);
  }, []);

  return (
    <div className={styles.loading_view}>
      <span
        className={styles.loading_view_title}
        style={{ color: "#fff", fontSize: "20px" }}
      >
        {loading ? "" : "Searching Products..."}
      </span>
    </div>
  );
};
export default LoadingView;
