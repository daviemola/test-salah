import React from "react";
import styles from "./loadingView.module.css";
// import { lightOrDark } from "../../../utils/lightOrDark";
import { lightOrDark } from "../../../utils/lightOrDark";

const LoadingView = (detail) => {
  const [loading, setloading] = React.useState(true);
  console.log(detail.detail.background_color);
  // //settimeout to simulate loading time
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     console.log("loading");
  //     setloading(false);
  //   }, 3000);
  // }, []);
  console.log(lightOrDark(detail?.background_color));

  return (
    <div className={styles.loading_view}>
      <p
        className={styles.loading_view_title}
        style={{
          color:
            lightOrDark(detail?.detail?.background_color) === "light"
              ? "#57584E"
              : "#ffffff",
          fontSize: "20px",
        }}
      >
        {loading ? "Searching Products..." : null}
      </p>
    </div>
  );
};
export default LoadingView;
