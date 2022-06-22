import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./aboutus.module.css";
import ReactHtmlParser from "react-html-parser";

const AboutUs = ({ openModal, toggle, detail }) => {
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
          <a
            onClick={toggle}
            href="#close"
            className="modal-overlay"
            aria-label="Close"
          ></a>
          <div className="modal-container">
            <div className="modal-header about-view">
              <a className="btn btn-clear float-right" aria-label="Close"></a>
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
                  <a
                    href="mailto:asdasd@ad.com?subject=Question for Test Store&amp;body=Hello, I have a question for Test Store https://paystack.shop/test-salah"
                    className="m-b-2"
                  >
                    <img src="/assets/images/mail.svg" alt="Email" />
                    <span className="about-view__email">asdasd@ad.com</span>
                  </a>
                  <a href="tel:+970599825671" className="m-t-5">
                    <img src="/assets/images/phone.svg" alt="Email" />
                    <span className="about-view__email">+970599825671</span>
                  </a>
                </div>
                <div className="flex-align-self--end">
                  <div className="flex">
                    <div className="about-view__icon">
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://instagram.com/sad"
                      >
                        <img
                          src="/assets/images/social/instagram-gray.svg"
                          alt="Instagram"
                        />
                      </a>
                    </div>
                    <div className="about-view__icon">
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://twitter.com/asd"
                      >
                        <img
                          src="/assets/images/social/twitter-gray.svg"
                          alt="Twitter"
                        />
                      </a>
                    </div>
                    <div className="about-view__icon">
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://facebook.com/asd"
                      >
                        <img
                          src="/assets/images/social/facebook-gray.svg"
                          alt="Facebook"
                        />
                      </a>
                    </div>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://api.whatsapp.com/send?phone=+970599825671&amp;text=Hello, I have a question for Test Store https://paystack.shop/test-salah"
                    >
                      <img
                        src="/assets/images/social/whatsapp-gray.svg"
                        alt="Whatsapp"
                      />
                    </a>
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
