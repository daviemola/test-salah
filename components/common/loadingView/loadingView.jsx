import React from "react";
import styles from "./loadingView.module.css";

const LoadingView = () => {
  const [loading, setloading] = React.useState(true);

  // //settimeout to simulate loading time
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     console.log("loading");
  //     setloading(false);
  //   }, 3000);
  // }, []);

  return (
    <div className={styles.loading_view}>
      <span
        className={styles.loading_view_title}
        style={{ color: "#fff", fontSize: "20px" }}
      >
        {loading ? "Searching Products..." : null}
      </span>
    </div>
  );
};
export default LoadingView;
