import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";

import styles from "./SocialNetworkLinks.module.css";

const SocialIcon = ({ network, networkLink }) => {
  switch (network) {
    case "facebook":
      return (
        <a href={networkLink} target="_blank" className={styles.socialLink_a}>
          <AiOutlineFacebook size={"2em"} />
        </a>
      );
      break;
    case "instagram":
      return (
        <a href={networkLink} target="_blank" className={styles.socialLink_a}>
          <AiOutlineInstagram size={"2em"} />
        </a>
      );
      break;
    case "linkedIn":
      return (
        <a href={networkLink} target="_blank" className={styles.socialLink_a}>
          <AiOutlineLinkedin size={"2em"} />
        </a>
      );
      break;
    case "email":
      return (
        <a href={`mailto:${networkLink}`} target="_blank" className={styles.socialLink_a}>
          <AiOutlineMail size={"2em"} /> <span className={styles.socialLink_span}>{networkLink}</span>
        </a>
      );
      break;
    case "phone":
      return (
        <a href={`callto:${networkLink}`} target="_blank" className={styles.socialLink_a}>
          <AiOutlinePhone size={"2em"} /> <span className={styles.socialLink_span}>{networkLink}</span>
        </a>
      );
      break;
    default:
      break;
  }
};

export default function SocialNetworkLinks({ socialNetworks = [] }) {
  console.log({ socialNetworks });
  return (
    <div className={styles.root}>
      <ul className={styles.socialLink_ul}>
        {socialNetworks.length &&
          socialNetworks.map(({ _key, ...props }) => (
            <li key={_key} className={styles.socialLink_Li}>
              <SocialIcon {...props} />
            </li>
          ))}
      </ul>
    </div>
  );
}
