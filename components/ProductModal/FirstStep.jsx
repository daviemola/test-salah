import React from "react";
import { adjust, numberWithCommas } from "../../utils/coloradjust";
import { lightOrDark } from "../../utils/lightOrDark";
import { useRouter } from "next/router";
import { useKeenSlider } from "keen-slider/react";
import CartContext from "@/context/CartContext";
import { useContext } from "react";
import styles from "./ProductModal.module.css";
import axios from "axios";
import { Listbox } from "@headlessui/react";

export default function FirstStep({ objectdetail, detail, toggle }) {
  const [objectDetail, setObjectDetail] = React.useState(objectdetail);
  // console.log(objectdetail);
  // let objectDetail = objectdetail;
  const [values, setValues] = React.useState([]);
  const router = useRouter();
  const [message, setMessage] = React.useState("Choose");
  const [err, setErr] = React.useState("");
  const [errZero, setErrZero] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [apiErr, setApiErr] = React.useState(true);
  let [quantity, setQuantity] = React.useState(1);
  const [active, setActive] = React.useState(false);
  const [details, setDetails] = React.useState();
  const [toggleContactSeller, setToggleContactSeller] = React.useState(false);
  let msg = `Hello, I have a question about Nike Tiempo Legend VIII Elite FG https://paystack.shop/fitsbettersports?product=nike-tempo-legend-viii-elite-fg-hedlkm`;

  const {
    addToCart,
    toggleSidebar,
    cartItems,
    addMoreItemToCart,
    addNewToCart,
  } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const addToCartItems = () => {
    if (isInCart(objectDetail)) {
      // let data;
      if (quantity !== 0) {
        //   if (objectDetail.id !== objectdetail.id) {
        let data = cartItems.find((item) => item.id === objectDetail.id);
        // } else {
        //   data = objectDetail;
        // }
        // const data = cartItems.find((item) => item.id === objectDetail.id);
        console.log(data);
        console.log("in cart");
        // data.selected_details = details;
        // console.log(data.quantity_cart);
        data.quantity_cart = Number(quantity) + data.quantity_cart;
        // console.log(data.quantity_cart);
        // increase(data);
        // addToCart(data);
        addMoreItemToCart(data);
        // // setButtonShow(false);
        toggle();
        toggleSidebar();
      }
    } else {
      console.log("not in cart");
      if (quantity !== 0) {
        let data = objectDetail;
        // console.log(cartItems);
        data.selected_details = values;
        console.log(data.quantity_cart);
        data.quantity_cart = quantity;
        console.log(data.quantity_cart);
        console.log(data);
        console.log(cartItems);
        if (cartItems.length === 0) {
          console.log("nothing in cart");
          addToCart(data);
        } else {
          console.log("items in cart");
          addNewToCart(data);
        }
        // return;
        // addToCart(data);
        // addNewToCart(data);
        // setButtonShow(false);
        toggle();
        toggleSidebar();
      }
    }
  };
  console.log(cartItems);

  const toggleClick = () => {
    setToggleContactSeller(!toggleContactSeller);
  };

  const checkQuantity = (item) => {
    console.log("this runs");
    if (item.unlimited === true) {
      setErr("");
    } else if (item?.quantity === 0) {
      setErr(`Sold out`);
    } else if ((item.in_stock === false || item.quantity === 0) && err !== "") {
      setErr("Sold out");
    } else if (Number(quantity) > item?.quantity) {
      console.log(quantity);
      console.log(item.quantity);
      setErr(`Only ${item?.quantity} in stock.`);
    } else if (Number(quantity) < 0) {
      setErr("You cannot order fewer than 1 items at a time");
    } else {
      setErr("");
    }
    console.log(err);
  };

  const validateItems = async () => {
    try {
      setSearching(true);
      setErr(" ");
      const val = values
        .map((val) => {
          return `${val.name.toLowerCase()}=${val.value}&`;
        })
        .join("");

      const items = values
        .map((val) => {
          return ` ${val.value}`;
        })
        .join();

      const { data } = await axios.get(
        `https://api.paystack.co/product/verify/${objectDetail?.slug}/variant?${val}`
      );

      console.log(data);
      if (data.message === "This product is not available") {
        setErr("");
        setMessage({
          msg: data.message,
          info: items,
          name: objectDetail?.name,
        });
        setErr(`${objectDetail?.name} ${items} is not available.`);
      } else {
        objectDetail = data.data;
        setObjectDetail(data.data);
        checkQuantity(data.data);
      }

      if (data.data) setApiErr(false);
      setSearching(false);
      return data.data;
    } catch (error) {
      console.log(error.response?.data?.message);
      setErr(error?.response?.data?.message);
      // setApiErr(true);
      // setSearching(false);
      // console.log(error.response.data);
      return [];
    }
  };

  React.useEffect(() => {
    if (
      objectDetail?.variant_options.length === 0 &&
      objectDetail.quantity > 0 &&
      objectDetail.unlimited === true
    ) {
      console.log("set to active");
      console.log(objectDetail?.variant_options.length);
      setActive(true);
    } else {
      console.log("not active");
    }
    console.log(values);
    console.log(err);
    // validateItems();
    checkQuantity(objectDetail);
  }, [quantity, values]);

  console.log(err);

  const handleChange = (event, index, i, name, val) => {
    let obj = {};
    obj[`value`] = val !== undefined ? val : event;
    obj[`name`] = name;
    if (~index) {
      values[i] = obj;
    }
    setValues([...values]);
    // console.log(objectDetail?.variant_options.length);
    const valz = values.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.name.toLowerCase()]: cur.value.toLowerCase(),
      }),
      {}
    );
    setDetails(valz);
    console.log(valz);
    console.log(values);
    if (values.length === objectDetail?.variant_options.length) validateItems();
  };

  React.useEffect(() => {
    console.log("runs");
    if (message.msg === "This product is not available")
      setErr(`${message.name} ${message.info} is not available`);
  }, [message]);

  console.log(detail);

  return (
    <>
      {objectDetail?.variant_options.map((option, index) => {
        let useButton;
        option.values.map((opt) => {
          // console.log(opt.name.split(" ").length);
          if (opt.name.split(" ").length === 1) {
            // console.log(opt.name.split(" ").length);
            // console.log("use button");
            useButton = true;
          }
        });
        // console.log(values[index]);
        // console.log(index);
        return (
          <div key={index}>
            <>
              {(index === 0 || index === 1) && useButton === true ? (
                <>
                  <h6 className={styles.product_view__text_light}>
                    {option?.name}
                  </h6>
                  <div className={styles.product_view__variant_container}>
                    {option.values.map((opt, i) => {
                      return (
                        <button
                          key={i}
                          disabled={
                            index !== 0 && values[index - 1] === undefined
                          }
                          name={option.name}
                          // value={opt.name}
                          value={values[index]?.value}
                          className={
                            values[index]?.value === opt.name &&
                            values[index]?.name === option.name
                              ? `${styles.variant_button} ${styles.m_r_10} ${styles.active}`
                              : `${styles.variant_button} ${styles.m_r_10}`
                          }
                          onClick={(e) => {
                            // console.log("clicking");
                            // console.log(first);
                            handleChange(
                              e,
                              index,
                              index,
                              option.name,
                              opt.name
                            );
                          }}
                        >
                          {opt.name}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h6 className={styles.product_view__text_light}>
                    {option.name}
                  </h6>
                  <Listbox
                    disabled={index !== 0 && values[index - 1] === undefined}
                    value={values[index]?.value}
                    name={option.name}
                    onChange={(e) => {
                      handleChange(e, index, index, option.name);
                    }}
                  >
                    <div className={styles.beforebutton}>
                      <Listbox.Button
                        className={styles.variant_select_container__input}
                      >
                        <span>
                          {values[index]?.name
                            ? values[index]?.value
                            : "Choose"}
                        </span>
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
                        {/* {option.name} */}
                      </Listbox.Button>
                      <Listbox.Options className={styles.listoptions}>
                        <Listbox.Option
                          className={styles.listitemone}
                          disabled={values[index - 1]?.value === undefined}
                        >
                          Choose
                        </Listbox.Option>
                        {option.values.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            value={person.name}
                            className={styles.listitem}
                          >
                            {person.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </>
              )}
            </>
          </div>
        );
      })}
      <div style={{ marginTop: "20px" }}>
        <h6 className={styles.product_view__text_light}>How Many</h6>
        <div className="quantity">
          <span>
            <button
              type="button"
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
            className={styles.quantity_input}
            value={Number(quantity)}
            onChange={(e) => {
              if (Number(e.target.value) > 0) {
                setQuantity(e.target.value);
                console.log(Number(e.target.value));
              }
              // // e.target.value;
              // if (Number(e.target.value) === 0) {
              //   return;
              //   console.log("err");
              //   setErr("You cannot order fewer than 1 items at a time");
              // }
              // checkQuantity(objectDetail);
            }}
            min="0"
            max="100"
          />
          <span>
            <button
              className="quantity--plus"
              onClick={(e) => {
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
        <p className={styles.product_view_text_price}>
          {objectDetail?.min_variant_price !== objectDetail?.max_variant_price
            ? `${objectDetail?.currency} ${numberWithCommas(
                numberWithCommas(objectDetail?.min_variant_price / 100)
              )}
              - ${numberWithCommas(objectDetail?.max_variant_price / 100)}`
            : `${objectDetail?.currency} ${numberWithCommas(
                objectDetail?.price / 100
              )}`}
        </p>
        {err ? (
          <p style={{ color: "#C70039", fontWeight: "500" }}>{err}</p>
        ) : null}
        <div
          className={`d-flex mt-6 ${styles.mobile_change}`}
          style={{ marginTop: "24px" }}
        >
          <button
            className={`${styles.button} ${styles.button_cta}`}
            disabled={
              !(
                values.length === objectDetail?.variant_options.length &&
                !searching &&
                (active || err === "")
              )
            }
            style={{
              backgroundColor:
                lightOrDark(detail?.background_color) === "light"
                  ? "#3BB75E"
                  : adjust(detail?.background_color, -30),
              fontWeight: "600",
              opacity:
                values.length === objectDetail?.variant_options.length &&
                !searching &&
                (active || err === "")
                  ? 1
                  : 0.5,
            }}
            onClick={addToCartItems}
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
              <span className={`${styles.icon_container} ${styles.start}`}>
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
                <span className={styles.dropdown_container__title_default}>
                  Contact Seller
                </span>
              </span>
              <span className={`${styles.icon_container} ${styles.end}`}>
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
                {detail?.contacts?.find(
                  (media) => media.type_name === "Whatsapp"
                ) !== undefined && (
                  <a
                    rel="noreferrer"
                    className={styles.anchor}
                    href={`https://api.whatsapp.com/send?phone=${
                      detail?.contacts?.find(
                        (media) => media.type_name === "Whatsapp"
                      ).value
                    }&text=${msg}`}
                    target="_blank"
                  >
                    <li>
                      <div className={`${styles.tag} ${styles.tag_contact}`}>
                        <span className={styles.w_100}>
                          <div
                            className={`${styles.flex} ${styles.flex_align_center}`}
                          >
                            <img
                              src="/assets/images/social/whatsapp.svg"
                              alt="click"
                              className={styles.tag_img_custom}
                            />
                            <span className={styles.tag_options}>Whatsapp</span>
                          </div>
                        </span>
                      </div>
                    </li>
                  </a>
                )}
                {detail?.contacts?.find(
                  (media) => media.type_name === "Phone"
                ) !== undefined && (
                  <a
                    rel="noreferrer"
                    className={styles.anchor}
                    href={`tel:${
                      detail?.contacts?.find(
                        (media) => media.type_name === "Phone"
                      ).value
                    }`}
                    target="_blank"
                  >
                    <li>
                      <div className={`${styles.tag} ${styles.tag_contact}`}>
                        <span className={styles.w_100}>
                          <div
                            className={`${styles.flex} ${styles.flex_align_center}`}
                          >
                            <img
                              src="/assets/images/phone.svg"
                              alt="click"
                              className={styles.tag_img_custom}
                            />
                            <span className={styles.tag_options}>Phone</span>
                          </div>
                        </span>
                      </div>
                    </li>
                  </a>
                )}
                {detail?.contacts?.find(
                  (media) => media.type_name === "Email"
                ) !== undefined && (
                  <a
                    rel="noreferrer"
                    className={styles.anchor}
                    href={`mailto:${
                      detail?.contacts?.find(
                        (media) => media.type_name === "Email"
                      ).value
                    }?subject=Question about ${objectDetail.name}&body=${msg}`}
                    target="_blank"
                  >
                    <li>
                      <div className={`${styles.tag} ${styles.tag_contact}`}>
                        <span className={styles.w_100}>
                          <div
                            className={`${styles.flex} ${styles.flex_align_center}`}
                          >
                            <img
                              src="https://paystack.shop/assets/images/mail-sm-gray.svg"
                              alt="click"
                              className={styles.tag_img}
                            />
                            <span className={styles.tag_options}>Email</span>
                          </div>
                        </span>
                      </div>
                    </li>
                  </a>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
