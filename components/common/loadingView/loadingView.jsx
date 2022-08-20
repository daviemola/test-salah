import React from "react";
import styles from "./loadingView.module.css";

const LoadingView = () => {
  const [loading, setloading] = React.useState(true);
  const [loading2, setloading2] = React.useState(true);

  //settimeout to simulate loading time
  React.useEffect(() => {
    setTimeout(() => {
      setloading(false);
      // React.useEffect(() => {
      // setTimeout(() => {
      //   setloading2(false);
      // }, 1000);
      // }, []);
    }, 3000);
  }, []);

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
