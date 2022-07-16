import React from "react";

import styles from "./socialMediaIcons.module.css";
import { lightOrDark } from "../../../utils/lightOrDark";
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";

const SocialMediaIcons = ({ detail }) => {
  return (
    <div
      className="social-media flex flex-justify--center"
      style={{ marginBottom: "16px" }}
    >
      <div className="social-media__icon-section">
        <a
          href={`https://instagram.com/${
            detail?.social_media?.find(
              (media) => media.type_name === "Instagram"
            ).handle
          }`}
        >
          <BsInstagram
            style={{
              color: "#fff",
            }}
          />
        </a>
      </div>

      <div className={styles.socialMediaIcon}>
        <a
          href={`https://twitter.com/${
            detail?.social_media?.find((media) => media.type_name === "Twitter")
              .handle
          }`}
        >
          <BsTwitter
            style={{
              color: "#fff",
            }}
          />
        </a>
      </div>

      <div className={styles.socialMediaIcon}>
        <a
          href={`https://facebook.com/${
            detail?.social_media?.find(
              (media) => media.type_name === "Facebook"
            ).handle
          }`}
        >
          <ImFacebook
            style={{
              color: "#fff",
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaIcons;
