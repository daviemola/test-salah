import React, { useState } from "react";
import { SocialMediaIcons } from "../../common";
import { AboutUs } from "./aboutus/aboutus";
import { lightOrDark } from "../../../utils/lightOrDark";

const Footer = ({ detail }) => {
  console.log(detail);
  console.log(lightOrDark(detail.background_color));
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  console.log(detail.background_color);

  // console.log(
  //   pickTextColorBasedOnBgColorAdvanced(
  //     detail?.background_color,
  //     "#fff",
  //     "#000"
  //   )
  // );

  function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? darkColor : lightColor;
  }

  return (
    <>
      <footer
        className="main-footer"
        style={{ background: detail.background_color }}
      >
        {/* <div>{detail}</div> */}
        <div className="flex flex-justify--space-between">
          <div className="main-footer__left">
            <a
              className="main-footer__link"
              onClick={toggle}
              style={{
                color:
                  lightOrDark(detail?.background_color) === "light"
                    ? "#57584E"
                    : "#ffffff",
              }}
            >
              About Us
            </a>
          </div>
          <div className="main-footer__right">
            <SocialMediaIcons detail={detail} />
          </div>
        </div>
      </footer>
      <AboutUs openModal={modal} toggle={toggle} detail={detail} />
    </>
  );
};

export default Footer;
