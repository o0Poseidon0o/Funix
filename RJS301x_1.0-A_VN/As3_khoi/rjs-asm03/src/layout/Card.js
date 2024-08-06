// import { useEffect, useState } from "react";
import classes from "./Card.module.css";
import React from "react";
const Card = (props) => {

  return (
    
    <div className={classes.bg}>{props.children}</div>
  );
};

export default Card;
