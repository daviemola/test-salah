import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./ProductModal.module.css";
import "keen-slider/keen-slider.min.css";
import ProductSlider from "../ProductSlider/ProductSlider";
import ReactHtmlParser from "react-html-parser";
import FirstStep from "./FirstStep";

const ProductModal = ({ openModal, objectDetail, toggle, detail }) => {
  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modalContainer}>
          <div className={styles.modal_header}>
            <a
              className={`${styles.btn} ${styles.btn_clear} ${styles.float_right}`}
              aria-label="Close"
              onClick={toggle}
            >
              &times;
            </a>
            <div
              className={`${styles.product_view_title} ${styles.flex} ${styles.pointer}`}
            >
              <span>Buy</span>
              <img
                src="/assets/images/arrowTop.svg"
                className={styles.ml_6}
                alt="img"
              />
            </div>
          </div>
          <div className={``}>
            <div className={`content ${styles.container}`}>
              <div className={"columns m-0"}>
                <div
                  className={`column col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-7 ${styles.product_media_col}`}
                >
                  <div className={styles.product_view__media_container}>
                    <div className={styles.carousel_product_detail}>
                      <div className={styles.navigation_wrapper}>
                        <ProductSlider images={objectDetail} />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`column col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-5 ${styles.product_view_info}`}
                >
                  <h5 className={styles.product_view__product_name}>
                    {objectDetail?.name}
                  </h5>
                  <h5 className={styles.product_view__merchant_name}>
                    {`By ${detail?.integration?.name}`}
                  </h5>
                  <div className={styles.product_view__product_description}>
                    {ReactHtmlParser(objectDetail?.description)}
                  </div>
                  <div>
                    {objectDetail?.variant_options.length <= 10 ? (
                      <FirstStep
                        objectdetail={objectDetail}
                        detail={detail}
                        toggle={toggle}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ProductModal;
