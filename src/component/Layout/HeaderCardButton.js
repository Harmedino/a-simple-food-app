import React, { useEffect,useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import { useContext } from "react";
import CartContex from "../../store/cart-contex";

const HeaderCardButton = (props) => {
 const [butonHighlight, setButtonHighlight]= useState(false)
  const ctx = useContext(CartContex);
  const {items} = ctx

  const btnClass = `${classes.button} ${ butonHighlight ? classes.bump : ''}`

  const numberOfCartItem = items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

 

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setButtonHighlight(true)
  const timer =   setTimeout(() => {
      setButtonHighlight(false)
    }, 300);

    return () => {
      clearTimeout(timer)
    }
},[items])

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCardButton;
