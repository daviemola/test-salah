import React from "react";
import styles from "./noSearchFound.module.css";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const NoSearchFound = ({ searchKeyword }) => {
  const [toggleContactSeller, setToggleContactSeller] = React.useState(false);

  // console.log(searchKeyword);
  const toggleClick = () => {
    setToggleContactSeller(!toggleContactSeller);
  };

  return (
    <div className={styles.search_not_found}>
      <p
        className={styles.search_not_found_title}
        style={{ color: "#fff", fontSize: "24px" }}
      >
        We couldn&apos;t find{" "}
        <span
          className={styles.search_not_found_title_product}
          style={{ color: "#fff", fontSize: "24px" }}
        >
          {`"${searchKeyword}"`}
        </span>
      </p>
      <p className={styles.search_not_found_title} style={{ color: "#fff" }}>
        Try again?
      </p>
      <div className={styles.search_not_found_contact}>
        <div className={styles.dropdown_container} style={{}}>
          <div
            className={`${styles.dropdown} ${styles.dropdown_container} ${styles.contact_dropdown} ${styles.dropdown_container_default}`}
          >
            <span
              className={`${styles.button} ${styles.button_default} ${styles.dropdown_toggle} ${styles.dropdown_container_button}`}
              onClick={toggleClick}
              style={{
                border: "1px solid #fff",
                color: "#fff",
                backgroundColor: "#03649A",
              }}
            >
              <span className={`${styles.icon_container} ${styles.start}`}>
                {toggleContactSeller ? <AiFillHeart /> : <AiOutlineHeart />}
                {/* <img
                  src={
                    toggleContactSeller
                      ? "https://paystack.shop/assets/images/heart-filled-gray.svg"
                      : "https://paystack.shop/assets/images/heart-gray.svg"
                  }
                  alt="Heart"
                /> */}
              </span>
              <span
                className={styles.dropdown_container_title}
                style={{ background: "#03649A" }}
              >
                <span
                  className={styles.dropdown_container__title_default}
                  style={{ color: "#fff" }}
                >
                  Contact Seller
                </span>
              </span>
              <span className={`${styles.icon_container} ${styles.end}`}>
                {toggleContactSeller ? (
                  <MdKeyboardArrowUp style={{ fontSize: "20px" }} />
                ) : (
                  <MdKeyboardArrowDown style={{ fontSize: "20px" }} />
                )}
              </span>
            </span>
            {toggleContactSeller && (
              <ul
                className={`${styles.menu} ${styles.dropdown_container_menu}`}
              >
                <a
                  rel="noreferrer"
                  className={styles.anchor}
                  href="https://api.whatsapp.com/send?phone=112456789"
                  target="_blank"
                >
                  <li>
                    <div
                      className={`${styles.tag} ${styles.tag_contact}`}
                      style={{
                        border: "1px solid #fff",
                        color: "#fff",
                        backgroundColor: "#03649A",
                        paddingBottom: "24px",
                      }}
                    >
                      <span
                        className={styles.w_100}
                        style={{ marginBottom: "24px" }}
                      >
                        <div
                          className={`${styles.flex} ${styles.flex_align_center}`}
                          style={{ paddingBottom: "24px" }}
                        >
                          <AiOutlineWhatsApp
                            style={{ fontSize: "24px", marginLeft: "12px" }}
                          />

                          <span
                            className={styles.tag_options}
                            style={{ color: "#fff" }}
                          >
                            Whatsapp
                          </span>
                        </div>
                      </span>
                    </div>
                  </li>
                </a>
                <a className={styles.anchor} href="tel:112456789">
                  <li>
                    <div
                      className={`${styles.tag} ${styles.tag_contact}`}
                      style={{
                        border: "1px solid #fff",
                        color: "#fff",
                        backgroundColor: "#03649A",
                      }}
                    >
                      <span className={styles.w_100}>
                        <div
                          className={`${styles.flex} ${styles.flex_align_center}`}
                        >
                          <BsTelephone
                            style={{ fontSize: "20px", marginLeft: "12px" }}
                          />
                          {/* <img
                            src="/assets/images/phone.svg"
                            alt="click"
                            className={styles.tag_img_custom}
                          /> */}
                          <span
                            className={styles.tag_options}
                            style={{
                              color: "#fff",
                            }}
                          >
                            Phone
                          </span>
                        </div>
                      </span>
                    </div>
                  </li>
                </a>
                <a
                  className={styles.anchor}
                  href="mailto:alamayowa@gmail.com?subject=Question about New style Durag&body=Hello, I have a question about New style Durag https://paystack.shop/test-salah?product=new-style-durag"
                >
                  <li>
                    <div
                      className={`${styles.tag} ${styles.tag_contact}`}
                      style={{
                        border: "1px solid #fff",
                        color: "#fff",
                        backgroundColor: "#03649A",
                      }}
                    >
                      <span className={styles.w_100}>
                        <div
                          className={`${styles.flex} ${styles.flex_align_center}`}
                        >
                          <AiOutlineMail
                            style={{ fontSize: "24px", marginLeft: "12px" }}
                          />

                          {/* <img
                            src="https://paystack.shop/assets/images/mail-sm-gray.svg"
                            alt="click"
                            className={styles.tag_img}
                          /> */}
                          <span
                            className={styles.tag_options}
                            style={{
                              color: "#fff",
                            }}
                          >
                            Email
                          </span>
                        </div>
                      </span>
                    </div>
                  </li>
                </a>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSearchFound;
