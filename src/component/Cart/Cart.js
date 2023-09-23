import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContex from "../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContex);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitted(true);
    try {
      const response = await fetch(
        "https://react-http-96553-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: ctx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsSubmitted(false);
    setDidSubmitted(true);
    ctx.clearCart();
  };

  const cartItems = ctx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));
  const modalShow = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={() => setIsCheckout(true)}>
          Order
        </button>
      )}
    </div>
  );

  const cardModalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={() => setIsCheckout(false)}
          onSubmit={submitOrderHandler}
        />
      )}
      {!isCheckout && modalShow}
    </>
  );

  const didSubmitModalContent = (
    <>
      <h1>Order is being sent. </h1>
      <h3>Thanks for shopping with us</h3>

      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitted && !didSubmitted && cardModalContent}
      {isSubmitted && isSubmittingModalContent}
      {!isSubmitted && didSubmitted && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
