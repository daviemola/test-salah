import React from "react";
import styles from "./noSearchFound.module.css";

const NoSearchFound = ({ searchKeyword }) => {
  return (
    <div className={styles.search_not_found}>
      <p className={styles.search_not_found_title}>
        We couldn&apos;t find{" "}
        <span className={styles.search_not_found_title_product}>
          {searchKeyword}
        </span>
      </p>
      <p className={styles.search_not_found_title}>Try again?</p>
      <div className={styles.search_not_found_contact}>
        <div className={styles.dropdown_container}>
          <span
            className={`${styles.button} ${styles.dropdown_container_button}`}
          >
            <span className={`${styles.icon_container} ${styles.start}`}>
              <svg
                width="14"
                height="14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.253 1.94a3.209 3.209 0 00-4.538 0l-.618.619-.619-.619A3.21 3.21 0 101.94 6.48l.618.618 4.539 4.538 4.538-4.538.618-.618a3.21 3.21 0 000-4.539v0z"
                  stroke="#57584E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <span className={styles.dropdown_container_title}>
              Contact Seller
            </span>
            <span className={`${styles.icon_container} ${styles.end}`}>
              <svg
                width="11"
                height="7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 11 7"
              >
                <path
                  d="M1.25 1.375L5.5 5.625L9.75 1.375"
                  stroke="#57584E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </span>
          <ul className={`${styles.menu} ${styles.dropdown_container_menu}`}>
            <a href="mailto:alamayowa@gmail.com?subject=Question for Shutabug's store&amp;body=Hello, I have a question for Shutabug's store https://paystack.shop/shutabug">
              <li className={styles.cursor_pointer}>
                <div className={`${styles.tag} ${styles.tag_contact}`}>
                  <span className={styles.w_100}>
                    <div
                      className={`${styles.flex} ${styles.flex_align_center}`}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.svg}
                      >
                        <path
                          d="M2.667 2.667h10.666c.734 0 1.334.6 1.334 1.333v8c0 .733-.6 1.333-1.334 1.333H2.667c-.734 0-1.334-.6-1.334-1.333V4c0-.733.6-1.333 1.334-1.333z"
                          stroke="#57584E"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M14.667 4L8 8.667 1.333 4"
                          stroke="#57584E"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span className={styles.content}>Email</span>
                    </div>
                  </span>
                </div>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoSearchFound;
