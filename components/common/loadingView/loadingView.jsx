import React from "react";
import styles from "./loadingView.module.css";
import { lightOrDark } from "../../../utils/lightOrDark";

const LoadingView = (detail) => {
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
        style={{
          color:
            lightOrDark(detail?.background_color) === "light"
              ? "#57584E"
              : "#ffffff",
          fontSize: "20px",
        }}
      >
        {loading ? "Searching Products..." : null}
      </span>
    </div>
  );
};
export default LoadingView;
