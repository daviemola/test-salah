import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./ProductSlider.module.css";

const ProductSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <div className="carousel-product-card">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images &&
            images.map((item) => {
              return (
                <div className={`keen-slider__slide slide`} key={item.key}>
                  <div className="slide-file-wrapper">
                    <img
                      className="slide-file"
                      src={item.path}
                      alt={item.type}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />
            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;

function ArrowLeft(props) {
  return (
    <div
      onClick={props.onClick}
      className="arrow-container arrow-container--left"
    >
      <img src="/assets/images/arrowLeft.svg" alt="arrow" />
    </div>
  );
}

function ArrowRight(props) {
  return (
    <div
      onClick={props.onClick}
      className="arrow-container arrow-container--right"
    >
      <img src="/assets/images/arrowRight.svg" alt="arrow" />
    </div>
  );
}
