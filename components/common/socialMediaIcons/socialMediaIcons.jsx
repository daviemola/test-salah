import React from "react";
import styles from "./socialMediaIcons.module.css";
import { lightOrDark } from "../../../utils/lightOrDark";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { ImWhatsapp } from "react-icons/im";

const SocialMediaIcons = ({ detail }) => {
  // console.log(
  //   detail?.contacts?.find((media) => media.type_name === "Whatsapp")
  // );
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
              color:
                lightOrDark(detail?.background_color) === "light"
                  ? "#57584E"
                  : "#ffffff",
              fontSize: "18px",
            }}
          />
        </a>
      </div>

      {/* <div className={styles.socialMediaIcon}>
        <a
          href={`https://twitter.com/${
            detail?.social_media?.find((media) => media.type_name === "Twitter")
              .handle
          }`}
        >
          <BsTwitter
            style={{
              color:
                lightOrDark(detail?.background_color) === "light"
                  ? "#57584E"
                  : "#ffffff",
              fontSize: "18px",
            }}
          />
        </a>
      </div> */}

      {/* <div className={styles.socialMediaIcon}>
        <a
          href={`https://facebook.com/${
            detail?.social_media?.find(
              (media) => media.type_name === "Facebook"
            ).handle
          }`}
        >
          <ImFacebook
            style={{
              color:
                lightOrDark(detail?.background_color) === "light"
                  ? "#57584E"
                  : "#ffffff",
              fontSize: "18px",
            }}
          />
        </a>
      </div> */}
      {detail?.contacts?.find((media) => media.type_name === "Whatsapp") !==
        undefined && (
        <div className={styles.socialMediaIcon}>
          <a
            href={`https://wa.me/${
              detail?.contacts?.find((media) => media.type_name === "Whatsapp")
                .value
            }`}
          >
            <ImWhatsapp
              style={{
                color:
                  lightOrDark(detail?.background_color) === "light"
                    ? "#57584E"
                    : "#ffffff",
                fontSize: "18px",
              }}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default SocialMediaIcons;
