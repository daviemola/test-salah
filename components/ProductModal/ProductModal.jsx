import React from "react";
import Modal from "@mui/material/Modal";
import { useKeenSlider } from "keen-slider/react";
// import {addToCart, toggleSidebar} from "../../store/action/sideBar";

// import { useDispatch } from "react-redux";
import styles from "./ProductModal.module.css";
import "keen-slider/keen-slider.min.css";
import ProductSlider from "../ProductSlider/ProductSlider";

const regex = /(<([^>]+)>)/gi;
const ProductModal = ({ openModal, objectDetail, toggle, detail }) => {
  // const dispatch = useDispatch();
  const [size, setSize] = React.useState("Choose");
  const [border, setBorder] = React.useState("Choose");
  const [frame, setFrame] = React.useState("");
  let [quantity, setQuantity] = React.useState(1);
  const [buttonShow, setButtonShow] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [toggleContactSeller, setToggleContactSeller] = React.useState(false);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      console.log("slide changes", s.details().relativeSlide);
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  const addToCartItem = () => {
    if (
      size !== "Choose" &&
      border !== "Choose" &&
      frame !== "" &&
      quantity !== 0
    ) {
      let data = objectDetail;
      data.size = size;
      data.border = border;
      data.frame = frame;
      data.quantity = quantity;
      dispatch(addToCart(data));
      setSize("Choose");
      setBorder("Choose");
      setFrame("");
      setQuantity(1);
      setButtonShow(false);
      toggle();
      dispatch(toggleSidebar());
    }
  };
  const getSize = (e) => {
    setSize(e.target.value);
  };
  const getBorder = (e) => {
    setBorder(e.target.value);
  };
  const toggleClick = () => {
    setToggleContactSeller(!toggleContactSeller);
  };
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
              ariaLabel="Close"
              onClick={toggle}
            >
              &times;
            </a>
            <div
              className={`${styles.product_view_title} ${styles.flex} ${styles.pointer}`}
            >
              <span>Buy</span>
              <img src="/assets/images/arrowTop.svg" className={styles.ml_6} />
            </div>
          </div>
          <div className={styles.productView_Content}>
            <div className={`content ${styles.container}`}>
              <div className={"columns m-0"}>
                <div
                  className={`column col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-7 ${styles.product_media_col}`}
                >
                  <div className={styles.product_view__media_container}>
                    <div className={styles.carousel_product_detail}>
                      <div className={styles.navigation_wrapper}>
                        <ProductSlider images={objectDetail?.files} />
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
                    {`By ${detail.integration.name}`}
                  </h5>
                  <p className={styles.product_view__product_description}>
                    {objectDetail?.description.replace(regex, "")}.
                  </p>
                  <div>
                    {objectDetail?.variant_options.map((option, index) => {
                      if (option.name.length > 10) {
                        return (
                          <div key={index}>
                            <h6 className={styles.product_view__text_light}>
                              {option.name}
                            </h6>
                            <div
                              className={styles.product_view__variant_container}
                            >
                              <div className={styles.variant_select_container}>
                                <div
                                  className={
                                    styles.variant_select_container__input
                                  }
                                >
                                  <span>{size}</span>
                                  <svg
                                    width="8"
                                    height="4"
                                    viewBox="0 0 8 4"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="variant-select-container__input__caret"
                                  >
                                    <path
                                      d="M7.20157 0.25H0.798435C0.521425 0.25 0.392412 0.59336 0.600883 0.775772L3.80245 3.57714C3.91556 3.67611 4.08444 3.67611 4.19755 3.57714L7.39912 0.775773C7.60759 0.593361 7.47858 0.25 7.20157 0.25Z"
                                      fill="#919191"
                                    ></path>
                                  </svg>
                                </div>
                                <select
                                  value={border}
                                  onChange={(e) => {
                                    setBorder(e.target.value);
                                    setButtonShow(true);
                                  }}
                                >
                                  <option value="choose" disabled selected>
                                    Choose
                                  </option>
                                  {option.values.map((value, index) => (
                                    <option key={value}>{value.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <h6 className={styles.product_view__text_light}>
                              {option.name}
                            </h6>
                            <div
                              className={styles.product_view__variant_container}
                            >
                              {option.values.map((value, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={"d-flex flex-wrap"}
                                  >
                                    <button
                                      className={
                                        frame == value.name
                                          ? `${styles.variant_button} ${styles.m_r_10} ${styles.active}`
                                          : `${styles.variant_button} ${styles.m_r_10}`
                                      }
                                      onClick={(e) => {
                                        setFrame(value.name);
                                        setButtonShow(true);
                                      }}
                                    >
                                      {value.name}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div>
                    <h6 className={styles.product_view__text_light}>
                      How Many
                    </h6>
                    <div className="quantity">
                      <span>
                        <button
                          type="button"
                          className="quantity--minus"
                          onClick={(e) => {
                            quantity > 1 && setQuantity(quantity - 1);
                          }}
                        >
                          <img src="assets/images/minus.svg" alt="Decrement" />
                        </button>
                      </span>
                      <input
                        type="tel"
                        className={styles.quantity_input}
                        value={quantity}
                        min="0"
                        max="100"
                      />
                      <span>
                        <button
                          className="quantity--plus"
                          onClick={(e) => {
                            setQuantity(quantity + 1);
                          }}
                        >
                          <img src="assets/images/plus.svg" alt="Increment" />
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className={styles.mt_4}>
                    <h6 className={styles.product_view__text_light}>Price</h6>
                    <p className={styles.product_view_text_price}>
                      {objectDetail?.currency}{" "}
                      {`${objectDetail?.min_variant_price} - ${objectDetail?.max_variant_price}`}
                    </p>
                    <div className={`d-flex mt-3 ${styles.mobile_change}`}>
                      <button
                        className={`${styles.button} ${styles.button_cta}`}
                        style={{
                          backgroundColor: "rgb(59, 183, 94)",
                          fontWeight: "600",
                          opacity: buttonShow ? 1 : 0.5,
                        }}
                        onClick={addToCartItem}
                        disabled={buttonShow ? false : true}
                      >
                        Add to bag
                      </button>
                      <div
                        className={`${styles.dropdown} ${styles.dropdown_container} ${styles.contact_dropdown} ${styles.dropdown_container_default}`}
                      >
                        <span
                          className={`${styles.button} ${styles.button_default} ${styles.dropdown_toggle} ${styles.dropdown_container_button}`}
                          onClick={toggleClick}
                        >
                          <span
                            className={`${styles.icon_container} ${styles.start}`}
                          >
                            <img
                              src={
                                toggleContactSeller
                                  ? "https://paystack.shop/assets/images/heart-filled-gray.svg"
                                  : "https://paystack.shop/assets/images/heart-gray.svg"
                              }
                              alt="Heart"
                            />
                          </span>
                          <span className={styles.dropdown_container_title}>
                            <span
                              className={
                                styles.dropdown_container__title_default
                              }
                            >
                              Contact Seller
                            </span>
                          </span>
                          <span
                            className={`${styles.icon_container} ${styles.end}`}
                          >
                            <img
                              src={
                                toggleContactSeller
                                  ? "https://paystack.shop/assets/images/chevron-up.svg"
                                  : "https://paystack.shop/assets/images/chevron-down.svg"
                              }
                              alt="Chevoron"
                            />
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
                                >
                                  <span className={styles.w_100}>
                                    <div
                                      className={`${styles.flex} ${styles.flex_align_center}`}
                                    >
                                      <img
                                        src="/assets/svg/whatsapp.svg"
                                        alt="click"
                                        className={styles.tag_img_custom}
                                      />
                                      <span className={styles.tag_options}>
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
                                >
                                  <span className={styles.w_100}>
                                    <div
                                      className={`${styles.flex} ${styles.flex_align_center}`}
                                    >
                                      <img
                                        src="/assets/svg/phone.svg"
                                        alt="click"
                                        className={styles.tag_img_custom}
                                      />
                                      <span className={styles.tag_options}>
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
                                >
                                  <span className={styles.w_100}>
                                    <div
                                      className={`${styles.flex} ${styles.flex_align_center}`}
                                    >
                                      <img
                                        src="https://paystack.shop/assets/images/mail-sm-gray.svg"
                                        alt="click"
                                        className={styles.tag_img}
                                      />
                                      <span className={styles.tag_options}>
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
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ProductModal;
