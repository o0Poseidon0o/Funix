import React from "react";
import styles from "./Footer.module.css";
import FooterList from "./FooterList";
const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <FooterList
          title={"CUSTOMER SERVICES"}
          firstOpt={"Help & Contact Us"}
          secondOpt={"Returns & Refunds"}
          thirdOpt={"Online Stores"}
          fourthOpt={"Terms & Conditions"}
        />
        <FooterList
          title={"COMPANY"}
          firstOpt={"What We Do"}
          secondOpt={"Available Services"}
          thirdOpt={"Latest Posts"}
          fourthOpt={"FAQs"}
        />
        <FooterList
          title={"SOCIAL MEDIA"}
          firstOpt={"Twitter"}
          secondOpt={"Instagram"}
          thirdOpt={"Facebook"}
          fourthOpt={"Pinterest"}
        />
      </div>
    </footer>
  );
};

export default Footer;
