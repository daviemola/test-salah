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

export default function FirstStep({ objectdetail, detail }) {
  // console.log(objectdetail);
  let objectDetail = objectdetail;
  const [values, setValues] = React.useState([]);
  const router = useRouter();
  const [size, setSize] = React.useState("Choose");
  const [err, setErr] = React.useState("");
  const [errZero, setErrZero] = React.useState("");
  const [searching, setSearching] = React.useState(true);
  const [apiErr, setApiErr] = React.useState(true);
  let [quantity, setQuantity] = React.useState(1);
  const [first, setFirst] = React.useState("");
  const [name, setName] = React.useState("");
  // const [second, setSecond] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [toggleContactSeller, setToggleContactSeller] = React.useState(false);

  const toggleClick = () => {
    setToggleContactSeller(!toggleContactSeller);
  };

  const checkQuantity = () => {
    if (objectDetail.unlimited === true) {
      setErr("");
    } else if (objectDetail.in_stock === false) {
      setErr("Sold out");
    } else if (Number(quantity) > objectDetail?.quantity) {
      setErr(`Only ${objectDetail?.quantity} in stock.`);
    } else if (Number(quantity) < 0) {
      setErr("You cannot order fewer than 1 items at a time");
    } else {
      setErr("");
    }
  };

  const validateItems = async () => {
    try {
      setSearching(true);

      const val = values
        .map((val) => {
          return `${val.name}=${val.value}&`;
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
        setErr(`${objectDetail?.name} ${items} is not available.`);
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
    console.log(values);
    // validateItems();
    checkQuantity();
  }, [quantity, values]);

  // console.log(err);

  const handleChange = (event, index, i, name, val) => {
    let obj = {};
    obj[`value`] = val !== undefined ? val : event;
    obj[`name`] = name;
    if (~index) {
      values[i] = obj;
    }
    setValues([...values]);
    console.log(objectDetail?.variant_options.length);
    console.log(values.length);
    if (values.length === objectDetail?.variant_options.length) validateItems();
  };

  React.useEffect(() => {
    // setSelectedcity({ name: changing, id: 1234 });
    console.log("running on values");
  }, [values]);

  // console.log(values);

  return (
    <>
      {objectDetail?.variant_options.map((option, index) => {
        let useButton;
        // console.log(option.values);
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
                            console.log(values[index - 1]);
                            // if(values[index-1] === undefined)
                            // console.log(option.name);
                            // setSecond(opt.name);
                            // first ? validateItems() : null;
                            // objectDetail?.quantity === 0
                            //   ? setErr("Product not fou nd")
                            //   : setErr("");
                            // setButtonShow(true);
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
                  {/* <h6 className={styles.product_view__text_light}>
                    {option.name}
                  </h6>
                  <div className={styles.product_view__variant_container}>
                    <div className={styles.variant_select_container}>
                      <div className={styles.variant_select_container__input}>
                        <span>
                          {values[index]?.name ? values[index].value : "choose"}
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
                      </div>
                      <select
                        // value={values[index]?.value}
                        value={second}
                        name={option.name}
                        id={option.id}
                        // disabled={!first}
                        onChange={(e) => {
                          console.log("here");
                          // handleChange(e, index, index);
                          setSecond(e.target.value);
                          setErr("");
                          validateItems();
                          // console.log(second);
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
                  </div> */}
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
              // disabled={
              //   objectDetail?.variant_options.length === 0
              //     ? first === "" && err !== ""
              //     : apiErr
              // }
              // disabled={first === "" && err !== ""}
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
            // disabled={
            // err
            // first === "" &&
            // err !== "" &&
            // objectDetail?.variant_options.length > 0
            //   ||
            // apiErr
            // }
            className={styles.quantity_input}
            value={Number(quantity)}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            min="0"
            max="100"
          />
          <span>
            <button
              className="quantity--plus"
              // disabled={
              //   objectDetail?.variant_options.length === 0
              //     ? first === "" && err !== ""
              //     : apiErr
              // }
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
        {/* {err ? (
          <p style={{ color: "red", fontWeight: "500" }}>{err}</p>
        ) : objectDetail?.in_stock === false ? (
          <p style={{ color: "red", fontWeight: "500" }}>{`Sold out`}</p>
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
        )} */}
        <div
          className={`d-flex mt-6 ${styles.mobile_change}`}
          style={{ marginTop: "24px" }}
        >
          {/* {objectDetail?.variant_options.length > 0 && first === "" && !err ? (
            <button
              className={`${styles.button} ${styles.button_cta}`}
              disabled
              // disabled={
              //   !second
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
          ) : ( */}
          <button
            className={`${styles.button} ${styles.button_cta}`}
            disabled={
              (objectDetail?.unlimited === false &&
                Number(quantity) > objectDetail?.quantity &&
                Number(quantity) < 1) ||
              searching ||
              objectDetail?.quantity === 0 ||
              err ||
              errZero
            }
            style={{
              backgroundColor:
                lightOrDark(detail?.background_color) === "light"
                  ? "#3BB75E"
                  : adjust(detail?.background_color, -30),
              fontWeight: "600",
              opacity:
                (objectDetail?.unlimited === false &&
                  Number(quantity) > objectDetail?.quantity &&
                  Number(quantity) < 1) ||
                searching ||
                objectDetail?.quantity === 0 ||
                err ||
                errZero
                  ? 0.5
                  : 1,
            }}
            // onClick={addToCartItems}
          >
            Add to bag
          </button>
          {/* )} */}

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
                <a
                  rel="noreferrer"
                  className={styles.anchor}
                  href="https://api.whatsapp.com/send?phone=112456789"
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
                <a className={styles.anchor} href="tel:112456789">
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
                <a
                  className={styles.anchor}
                  href="mailto:alamayowa@gmail.com?subject=Question about New style Durag&body=Hello, I have a question about New style Durag https://paystack.shop/test-salah?product=new-style-durag"
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
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// {objectDetail?.variant_options[0]?.name.toLowerCase() == "size" && (
//   <div>
//     <h6 className={styles.product_view__text_light}>
//       {objectDetail?.variant_options[0]?.name}
//     </h6>
//     <div className={styles.product_view__variant_container}>
//       {objectDetail?.variant_options[0].values.map((value, index) => {
//         return (
//           <div key={index} className={"d-flex flex-wrap"}>
//             <button
//               // disabled={objectDetail?.quantity === 0}
//               className={
//                 second == value.name
//                   ? `${styles.variant_button} ${styles.m_r_10} ${styles.active}`
//                   : `${styles.variant_button} ${styles.m_r_10}`
//               }
//               onClick={(e) => {
//                 console.log("clicking");
//                 // console.log(first);
//                 setsecond(value.name);
//                 first ? validateItems() : null;
//                 // objectDetail?.quantity === 0
//                 //   ? setErr("Product not fou nd")
//                 //   : setErr("");
//                 // setButtonShow(true);
//               }}
//             >
//               {value.name}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// )}
// {objectDetail?.variant_options[1]?.name.toLowerCase() == "colour" && (
//   <div>
//     <h6 className={styles.product_view__text_light}>
//       {objectDetail?.variant_options[1]?.name}
//     </h6>
//     <div className={styles.product_view__variant_container}>
//       {objectDetail?.variant_options[1].values.map((value, index) => {
//         return (
//           <div key={index} className={"d-flex flex-wrap"}>
//             <button
//               // disabled={objectDetail?.quantity === 0}
//               className={
//                 second == value.name
//                   ? `${styles.variant_button} ${styles.m_r_10} ${styles.active}`
//                   : `${styles.variant_button} ${styles.m_r_10}`
//               }
//               onClick={(e) => {
//                 // console.log("clicking");
//                 // console.log(first);
//                 setsecond(value.name);
//                 first ? validateItems() : null;
//                 // objectDetail?.quantity === 0
//                 //   ? setErr("Product not fou nd")
//                 //   : setErr("");
//                 // setButtonShow(true);
//               }}
//             >
//               {value.name}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// )}
