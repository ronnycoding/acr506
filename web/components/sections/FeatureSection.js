import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";

import styles from "./FeatureSection.module.css";

const builder = imageUrlBuilder(client);

const FeatureSection = ({ feas = [] }) => {
  console.log({ feas });
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        {feas &&
          feas.map(({ _key, featureTitle, featureLogo }) => (
            <div key={_key} className={styles.cardContainer}>
              <img
                className={styles.cardImage}
                src={builder.image(featureLogo).width(65).auto("format").url()}
                alt="Sunset in the mountains"
              />
              <div className={styles.cardContainerInner}>
                <div className={styles.cardTitle}>{featureTitle}</div>
                <p className={styles.cardDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                  nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

FeatureSection.propTypes = {
  feas: PropTypes.array,
};

export default FeatureSection;
