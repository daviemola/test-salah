import React from "react";

import styles from "./socialMediaIcons.module.css";
import { lightOrDark } from "../../../utils/lightOrDark";

const SocialMediaIcons = ({ detail }) => {
  return (
    <div className="social-media flex flex-justify--center">
      <div className="social-media__icon-section">
        <a
          href={`https://instagram.com/${
            detail?.social_media.find(
              (media) => media.type_name === "Instagram"
            ).handle
          }`}
        >
          <img
            src={
              lightOrDark(detail?.background_color ?? "#fff") === "light"
                ? "/assets/images/social/instagram.svg"
                : "/assets/images/social/instagram-white.svg"
            }
            alt="instagram"
          />
        </a>
      </div>
      <div className={styles.socialMediaIcon}>
        <a
          href={`https://twitter.com/${
            detail?.social_media.find((media) => media.type_name === "Twitter")
              .handle
          }`}
        >
          <img
            src={
              lightOrDark(detail?.background_color ?? "#fff") === "light"
                ? "/assets/images/social/twitter.svg"
                : "/assets/images/social/twitter-white.svg"
            }
            alt="instagram"
          />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaIcons;
