import React, { useState } from "react";
import dynamic from "next/dynamic";
import imageUrlBuilder from "@sanity/image-url";
import Carousel from "react-multi-carousel";
// import NoSSR from "react-no-ssr";
import carouselStyles from "react-multi-carousel/lib/styles.css";

import SimpleBlockContent from "../SimpleBlockContent";
import client from "../../client";
import styles from "./TestimonialSection.module.css";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  return (
    <button className={styles.carouselButtonRight} onClick={onClick}>
      <span className={styles.carouselButtonRightSpan}>&#x279c;</span>
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  return (
    <button className={styles.carouselButtonLeft} onClick={onClick}>
      <span className={styles.carouselButtonLeftSpan}>&#x279c;</span>
    </button>
  );
};

export default function TestimonialSection({ deviceType, testimonies, tagline, heading }) {
  console.log({ testimonies });
  return (
    <div className={styles.root}>
      <div className={styles.containerInner}>
        <div>
          <h2 className={styles.testimonialTitle}>{heading}</h2>
          {tagline && <SimpleBlockContent blocks={tagline} />}
        </div>
        <Carousel
          responsive={responsive}
          ssr
          infinite={false}
          containerClass={styles.containerClass}
          deviceType={deviceType}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          className={carouselStyles["react-multi-carousel-list"]}
          sliderClass={carouselStyles["react-multi-carousel-track"]}
          itemClass={carouselStyles["react-multi-carousel-item"]}
        >
          {testimonies &&
            testimonies.map(({ _key, testimonyImage, testimonyQuote }) => {
              return (
                <div key={_key} className={styles.carouselBody}>
                  <div className={styles.carouselBodyInner}>
                    <img className={styles.carouselImg} src={urlFor(testimonyImage)} alt="" />
                  </div>
                  <div className={styles.carouselCardContainer}>
                    <div className={styles.carouselCardContainerInner}>
                      <div className={styles.carouselCardText}>
                        {testimonyQuote && <SimpleBlockContent blocks={testimonyQuote} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
}
