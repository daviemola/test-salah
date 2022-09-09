import React from "react";
import Modal from "@mui/material/Modal";
import { useKeenSlider } from "keen-slider/react";
import CartContext from "@/context/CartContext";
import { useContext } from "react";
import styles from "./ProductModal.module.css";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import { useRouter } from "next/router";
import ProductSlider from "../ProductSlider/ProductSlider";
import { adjust } from "../../utils/coloradjust";
import { lightOrDark } from "../../utils/lightOrDark";
import ReactHtmlParser from "react-html-parser";
import FirstStep from "./FirstStep";

const regex = /(<([^>]+)>)/gi;
const ProductModal = ({ openModal, objectDetail, toggle, detail }) => {
  console.log(objectDetail);
  const router = useRouter();
  const [size, setSize] = React.useState("Choose");
  const [err, setErr] = React.useState("");
  const [errZero, setErrZero] = React.useState("");
  const [apiErr, setApiErr] = React.useState(true);
  const [border, setBorder] = React.useState("");
  const [frame, setFrame] = React.useState("");
  const [variantlength, setVariantLength] = React.useState(
    objectDetail?.variant_options?.length
  );
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

  console.log(variantlength);

  const { addToCart, toggleSidebar, cartItems, increase } =
    useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const addToCartItems = () => {
    if (isInCart(objectDetail)) {
      if (quantity !== 0) {
        console.log(objectDetail);
        console.log("in cart");
        let data = objectDetail;
        data.quantity_cart = Number(quantity) + data.quantity_cart;
        console.log(data.quantity_cart);
        addToCart(data);
        setButtonShow(false);
        toggle();
        toggleSidebar();
      }
    } else {
      console.log("not in cart");
      if (quantity !== 0) {
        let data = objectDetail;
        data.size = size;
        data.border = border;
        data.frame = frame;
        data.quantity_cart = quantity;
        console.log(data);
        addToCart(data);
        setButtonShow(false);
        toggle();
        toggleSidebar();
      }
    }
  };

  const getSize = (e) => {
    setSize(e.target.value);
  };

  const getBorder = (e) => {
    setBorder(e.target.value);
  };
  // console.log(quantity);
  // console.log(err);

  const toggleClick = () => {
    setToggleContactSeller(!toggleContactSeller);
  };

  // const checkQuantity = () => {
  //   Number(quantity) > objectDetail?.quantity
  //     ? setErr(`Only ${objectDetail?.quantity} in stock.`)
  //     : setErr("");
  // };

  const validateItems = async () => {
    try {
      const { data } = await axios.get(
        `https://api.paystack.co/product/verify/${objectDetail?.name}/variant?size=${frame}&another%20option=${border}`
      );
      if (data.data) setApiErr(false);
      return data.data;
    } catch (error) {
      setErr(error?.response?.data?.message);
      setApiErr(true);
      // console.log(error.response.data);
      return [];
    }
  };

  console.log(objectDetail?.variant_options[0]?.name);

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
                      <FirstStep objectdetail={objectDetail} detail={detail} />
                    ) : null}
                  </div>
                  {/* <div>
                    {objectDetail?.variant_options[0]?.name.toLowerCase() ==
                      "size" && (
                      <div>
                        <h6 className={styles.product_view__text_light}>
                          {objectDetail?.variant_options[0]?.name}
                        </h6>
                        <div className={styles.product_view__variant_container}>
                          {objectDetail?.variant_options[0].values.map(
                            (value, index) => {
                              return (
                                <div key={index} className={"d-flex flex-wrap"}>
                                  <button
                                    // disabled={objectDetail?.quantity === 0}
                                    className={
                                      frame == value.name
                                        ? `${styles.variant_button} ${styles.m_r_10} ${styles.active}`
                                        : `${styles.variant_button} ${styles.m_r_10}`
                                    }
                                    onClick={(e) => {
                                      console.log("clicking");
                                      // console.log(border);
                                      setFrame(value.name);
                                      border ? validateItems() : null;
                                      // objectDetail?.quantity === 0
                                      //   ? setErr("Product not fou nd")
                                      //   : setErr("");
                                      // setButtonShow(true);
                                    }}
                                  >
                                    {value.name}
                                  </button>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                    {objectDetail?.variant_options[1]?.name.toLowerCase() ==
                      "colour" && (
                      <div>
                        <h6 className={styles.product_view__text_light}>
                          {objectDetail?.variant_options[1]?.name}
                        </h6>
                        <div className={styles.product_view__variant_container}>
                          {objectDetail?.variant_options[1].values.map(
                            (value, index) => {
                              return (
                                <div key={index} className={"d-flex flex-wrap"}>
                                  <button
                                    // disabled={objectDetail?.quantity === 0}
                                    className={
                                      frame == value.name
                                        ? `${styles.variant_button} ${styles.m_r_10} ${styles.active}`
                                        : `${styles.variant_button} ${styles.m_r_10}`
                                    }
                                    onClick={(e) => {
                                      // console.log("clicking");
                                      // console.log(border);

                                      setFrame(value.name);
                                      border ? validateItems() : null;
                                      // objectDetail?.quantity === 0
                                      //   ? setErr("Product not fou nd")
                                      //   : setErr("");
                                      // setButtonShow(true);
                                    }}
                                  >
                                    {value.name}
                                  </button>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                    {objectDetail?.variant_options[0]?.name.toLowerCase() ==
                    "size"
                      ? objectDetail?.variant_options.map((option, index) => {
                          if (objectDetail?.variant_options.length === 2) {
                            if (index < 2) return;
                          } else {
                            if (index < 1) return;
                          }
                          // if (
                          //   // objectDetail?.variant_options.length === 2 &&
                          //   objectDetail?.variant_options[0]?.name.toLowerCase() ==
                          //     "size" &&
                          //   objectDetail?.variant_options[0]?.name.toLowerCase() ==
                          //     "colour" &&
                          //   index < 2
                          // )
                          //   return;
                          // console.log(objectDetail?.variant_options[0].name);
                          return (
                            <div key={index}>
                              <h6 className={styles.product_view__text_light}>
                                {option.name}
                              </h6>
                              <div
                                className={
                                  styles.product_view__variant_container
                                }
                              >
                                <div
                                  className={styles.variant_select_container}
                                >
                                  <div
                                    className={
                                      styles.variant_select_container__input
                                    }
                                  >
                                    <span>{border ? border : size}</span>
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
                                    disabled={!frame}
                                    onChange={(e) => {
                                      setBorder(e.target.value);
                                      setErr("");
                                      validateItems();
                                      // console.log(border);
                                      // objectDetail?.quantity === 0
                                      //   ? setErr("Product not foun d")
                                      //   : setErr("");
                                    }}
                                  >
                                    <option disabled>Choose</option>
                                    {option.values.map((value, index) => (
                                      <option key={index} value={value.name}>
                                        {value.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : objectDetail?.variant_options[1]?.name.toLowerCase() ==
                        "colour"
                      ? objectDetail?.variant_options.map((option, index) => {
                          console.log("here s");
                          if (index < 2) return;
                          // if (
                          //   // objectDetail?.variant_options.length === 2 &&
                          //   objectDetail?.variant_options[0]?.name.toLowerCase() ==
                          //     "size" &&
                          //   objectDetail?.variant_options[0]?.name.toLowerCase() ==
                          //     "colour" &&
                          //   index < 2
                          // )
                          //   return;
                          // console.log(objectDetail?.variant_options[0].name);
                          return (
                            <div key={index}>
                              <h6 className={styles.product_view__text_light}>
                                {option.name}
                              </h6>
                              <div
                                className={
                                  styles.product_view__variant_container
                                }
                              >
                                <div
                                  className={styles.variant_select_container}
                                >
                                  <div
                                    className={
                                      styles.variant_select_container__input
                                    }
                                  >
                                    <span>{border ? border : size}</span>
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
                                    disabled={!frame}
                                    onChange={(e) => {
                                      setBorder(e.target.value);
                                      setErr("");
                                      validateItems();
                                      // console.log(border);
                                      // objectDetail?.quantity === 0
                                      //   ? setErr("Product not foun d")
                                      //   : setErr("");
                                    }}
                                  >
                                    <option disabled>Choose</option>
                                    {option.values.map((value, index) => (
                                      <option key={index} value={value.name}>
                                        {value.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : objectDetail?.variant_options.map((option, index) => {
                          return (
                            <div key={index}>
                              <h6 className={styles.product_view__text_light}>
                                {option.name}
                              </h6>
                              <div
                                className={
                                  styles.product_view__variant_container
                                }
                              >
                                <div
                                  className={styles.variant_select_container}
                                >
                                  <div
                                    className={
                                      styles.variant_select_container__input
                                    }
                                  >
                                    <span>{border ? border : size}</span>
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
                                    disabled={!frame}
                                    onChange={(e) => {
                                      setBorder(e.target.value);
                                      setErr("");
                                      validateItems();
                                      // console.log(border);
                                      // objectDetail?.quantity === 0
                                      //   ? setErr("Product not foun d")
                                      //   : setErr("");
                                    }}
                                  >
                                    <option disabled>Choose</option>
                                    {option.values.map((value, index) => (
                                      <option key={index} value={value.name}>
                                        {value.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
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
                          disabled={
                            objectDetail?.variant_options.length === 0
                              ? border === "" && err !== ""
                              : apiErr
                          }
                          // disabled={border === "" && err !== ""}
                          className="quantity--minus"
                          onClick={(e) => {
                            quantity > 1 && setQuantity(Number(quantity) - 1);
                            setErrZero("");
                          }}
                        >
                          <img src="assets/images/minus.svg" alt="Decrement" />
                        </button>
                      </span>
                      <input
                        type="tel"
                        disabled={
                          (border === "" &&
                            err !== "" &&
                            objectDetail?.variant_options.length > 0) ||
                          apiErr
                        }
                        className={styles.quantity_input}
                        value={Number(quantity)}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          objectDetail?.unlimited === false &&
                          Number(e.target.value) > objectDetail?.quantity
                            ? setErr(`Only ${objectDetail?.quantity} in stock.`)
                            : !objectDetail?.in_stock
                            ? setErr(`Sold out.`)
                            : setErr("");
                          Number(e.target.value) < 1
                            ? setErrZero(
                                "You cannot order few than 1 items at a time"
                              )
                            : setErrZero("");

                          // objectDetail?.quantity === 0
                        }}
                        min="0"
                        max="100"
                      />
                      <span>
                        <button
                          className="quantity--plus"
                          disabled={
                            objectDetail?.variant_options.length === 0
                              ? border === "" && err !== ""
                              : apiErr
                          }
                          // disabled={apiErr}
                          onClick={(e) => {
                            // console.log("first");
                            setQuantity(Number(quantity) + 1);
                            setErrZero("");
                          }}
                        >
                          <img src="assets/images/plus.svg" alt="Increment" />
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className={styles.mt_4}>
                    <h6 className={styles.product_view__text_light}>Price</h6>
                    <p
                      className={styles.product_view_text_price}
                      style={{ marginBottom: "24px" }}
                    >
                      {objectDetail?.currency}{" "}
                      {`${objectDetail?.min_variant_price / 100} `}
                      {`- ${objectDetail?.max_variant_price / 100} `}
                    </p>
                    {err ? (
                      <p style={{ color: "red", fontWeight: "500" }}>{err}</p>
                    ) : objectDetail?.in_stock === false ? (
                      <p
                        style={{ color: "red", fontWeight: "500" }}
                      >{`Sold out`}</p>
                    ) : objectDetail?.unlimited === false &&
                      quantity > objectDetail?.quantity ? (
                      <p
                        style={{ color: "red", fontWeight: "500" }}
                      >{`Only ${objectDetail?.quantity} in stock.`}</p>
                    ) : errZero ? (
                      <p style={{ color: "red", fontWeight: "500" }}>
                        You cannot order fewer than 1 items at a time
                      </p>
                    ) : (
                      ""
                    )}
                    <div className={`d-flex mt-3 ${styles.mobile_change}`}>
                      {objectDetail?.variant_options.length > 0 &&
                      border === "" &&
                      !err ? (
                        <button
                          className={`${styles.button} ${styles.button_cta}`}
                          disabled
                          // disabled={
                          //   !frame
                          //   // objectDetail?.quantity === 0
                          // }
                          style={{
                            backgroundColor:
                              lightOrDark(detail?.background_color) === "light"
                                ? "#3BB75E"
                                : adjust(detail?.background_color, -30),
                            fontWeight: "600",
                            opacity: 0.5,
                          }}
                          onClick={addToCartItems}
                        >
                          Add to bag
                        </button>
                      ) : (
                        <button
                          className={`${styles.button} ${styles.button_cta}`}
                          disabled={
                            (Number(quantity) < 1 &&
                              objectDetail?.unlimited === false &&
                              quantity > objectDetail?.quantity) ||
                            objectDetail?.quantity === 0 ||
                            err ||
                            errZero
                          }
                          style={{
                            backgroundColor: adjust(
                              detail?.background_color,
                              -30
                            ),
                            fontWeight: "600",
                            opacity:
                              (objectDetail?.unlimited === false &&
                                Number(quantity) > objectDetail?.quantity &&
                                Number(quantity) < 1) ||
                              objectDetail?.quantity === 0 ||
                              err ||
                              errZero
                                ? 0.5
                                : 1,
                          }}
                          onClick={addToCartItems}
                        >
                          Add to bag
                        </button>
                      )}

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
                                        src="/assets/images/social/whatsapp.svg"
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
                                        src="/assets/images/phone.svg"
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
                  </div> */}
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
