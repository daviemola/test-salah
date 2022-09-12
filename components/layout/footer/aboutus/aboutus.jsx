import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./aboutus.module.css";
import ReactHtmlParser from "react-html-parser";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { ImWhatsapp, ImFacebook } from "react-icons/im";
import { lightOrDark } from "../../../../utils/lightOrDark";

const AboutUs = ({ openModal, toggle, detail }) => {
  console.log(detail);
  console.log(
    detail?.social_media?.find((media) => media.type_name === "Instagram")
  );

  return (
    <Modal
      open={openModal}
      onClose={toggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        <div className="modal modal--slide-up-mobile modal--fade-in-bg-mobile flex-direction--column active">
          <a onClick={toggle} className="modal-overlay" aria-label="Close"></a>
          <div className="modal-container">
            <div className="modal-header about-view">
              <a
                className="btn btn-clear float-right"
                aria-label="Close"
                onClick={toggle}
              ></a>
              <div className="about-view__title">About Us</div>
            </div>
            <div className="modal-body">
              <div className="content">
                <div className="about-view__description">
                  {ReactHtmlParser(detail?.description)}
                </div>
              </div>
              <div className="about-view__footer">
                <div className="flex flex-align--start flex-direction--column">
                  {detail?.contacts?.find(
                    (media) => media.type_name === "Email"
                  ) !== undefined && (
                    <a
                      href="mailto:asdasd@ad.com?subject=Question for Test Store&amp;body=Hello, I have a question for Test Store https://paystack.shop/test-salah"
                      className="m-b-2"
                    >
                      <img src="/assets/images/mail.svg" alt="Email" />
                      <span className="about-view__email">
                        {
                          detail?.contacts?.find(
                            (media) => media.type_name === "Email"
                          ).value
                        }
                      </span>
                    </a>
                  )}
                  {detail?.contacts?.find(
                    (media) => media.type_name === "Whatsapp"
                  ) !== undefined && (
                    <a
                      href="mailto:asdasd@ad.com?subject=Question for Test Store&amp;body=Hello, I have a question for Test Store https://paystack.shop/test-salah"
                      className="m-b-2"
                    >
                      <img src="/assets/images/phone.svg" alt="Email" />
                      <span className="about-view__email">
                        {
                          detail?.contacts?.find(
                            (media) => media.type_name === "Whatsapp"
                          ).value
                        }
                      </span>
                    </a>
                  )}
                  {/* <a href="tel:+970599825671" className="m-t-5">
                    <img src="/assets/images/phone.svg" alt="Email" />
                    <span className="about-view__email">+970599825671</span>
                  </a> */}
                </div>
                <div className="flex-align-self--end">
                  <div className="flex">
                    {detail?.social_media?.find(
                      (media) => media.type_name === "Instagram"
                    ) !== undefined && (
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
                              color: "#57584E",
                              fontSize: "18px",
                            }}
                          />
                        </a>
                      </div>
                    )}
                    {detail?.social_media?.find(
                      (media) => media.type_name === "Twitter"
                    ) !== undefined && (
                      <div className={styles.socialMediaIcon}>
                        <a
                          href={`https://twitter.com/${
                            detail?.social_media?.find(
                              (media) => media.type_name === "Twitter"
                            ).handle
                          }`}
                        >
                          <BsTwitter
                            style={{
                              color: "#57584E",
                              fontSize: "18px",
                            }}
                          />
                        </a>
                      </div>
                    )}

                    {detail?.social_media?.find(
                      (media) => media.type_name === "Facebook"
                    ) !== undefined && (
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
                              color: "#57584E",
                              fontSize: "18px",
                            }}
                          />
                        </a>
                      </div>
                    )}
                    {detail?.contacts?.find(
                      (media) => media.type_name === "Whatsapp"
                    ) !== undefined && (
                      <div className={styles.socialMediaIcon}>
                        <a
                          href={`https://wa.me/${
                            detail?.contacts?.find(
                              (media) => media.type_name === "Whatsapp"
                            ).value
                          }`}
                        >
                          <ImWhatsapp
                            style={{
                              color: "#57584E",
                              fontSize: "18px",
                            }}
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="button button--outlined modal-bottom-button btn-clear"
            onClick={toggle}
          >
            <img src="https://paystack.shop/assets/images/close.svg" />
            Close
          </button>
        </div>
      </>
    </Modal>
  );
};

export default AboutUs;
