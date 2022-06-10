import React from "react";
// import {useSelector} from 'react-redux';
import styles from "./FloatingCartIconMobile.module.css";

const FloatingCartIconMobile = ({ onClose }) => {
  // const cartItems = useSelector(({ sidebar }) => {
  //   return sidebar.cart;
  // });
  let cartItems = [];

  return (
    <div className={styles.bag_fab} onClick={onClose}>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bag-fab__icon"
      >
        <path
          d="M5.93701 5.02759H12.2597V6.93422C12.2599 7.7665 11.927 8.56478 11.3341 9.15349C10.7413 9.74219 9.93707 10.0731 9.09838 10.0735C8.25969 10.0731 7.45548 9.74219 6.86263 9.15349C6.26978 8.56478 5.93683 7.7665 5.93701 6.93422V5.02759Z"
          fill="#F5F5F5"
        ></path>
        <path
          d="M9.09838 2.90053e-07C8.25981 0.000358059 7.45571 0.331187 6.86287 0.919747C6.27004 1.50831 5.93701 2.30641 5.93701 3.13858V5.1626H7.24507V3.13858C7.25437 2.65646 7.4539 2.1972 7.80077 1.85951C8.14764 1.52182 8.61416 1.33264 9.10008 1.33264C9.586 1.33264 10.0525 1.52182 10.3994 1.85951C10.7463 2.1972 10.9458 2.65646 10.9551 3.13858V5.1626H12.2631V3.13858C12.2631 2.72627 12.1811 2.31802 12.022 1.93714C11.8629 1.55625 11.6298 1.2102 11.3359 0.918752C11.042 0.627298 10.6931 0.396151 10.3092 0.23851C9.92531 0.0808692 9.51386 -0.000176943 9.09838 2.90053e-07Z"
          fill="#F5F5F5"
        ></path>
        <path
          d="M17.5967 18.9367L16.0813 5.87368C16.0542 5.64092 15.9419 5.42616 15.7656 5.27027C15.5894 5.11439 15.3615 5.02827 15.1254 5.02832H10.968V6.88164C10.968 7.37371 10.771 7.84563 10.4204 8.19357C10.0698 8.54152 9.59425 8.73699 9.0984 8.73699C8.60254 8.73699 8.127 8.54152 7.77637 8.19357C7.42575 7.84563 7.22877 7.37371 7.22877 6.88164V5.02832H3.07481C2.83866 5.02812 2.6107 5.11419 2.43441 5.2701C2.25811 5.42601 2.14581 5.64087 2.11892 5.87368L0.606223 18.9367C0.590797 19.0704 0.604017 19.2058 0.645016 19.334C0.686016 19.4622 0.753869 19.5804 0.844127 19.6808C0.934384 19.7812 1.04501 19.8616 1.16874 19.9166C1.29248 19.9716 1.42653 20 1.56211 20H16.6374C16.7733 20.0005 16.9077 19.9724 17.0318 19.9176C17.156 19.8628 17.267 19.7826 17.3577 19.6821C17.4483 19.5816 17.5164 19.4633 17.5576 19.3348C17.5988 19.2063 17.6122 19.0706 17.5967 18.9367Z"
          fill="#F5F5F5"
        ></path>
      </svg>
      <span className={styles.bag_fab_cart_total}>{cartItems.length}</span>
    </div>
  );
};
export default FloatingCartIconMobile;
