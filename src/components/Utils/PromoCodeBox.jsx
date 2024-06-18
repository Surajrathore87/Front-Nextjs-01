import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";

function PromoCodeBox(props) {
  const { setPromoCode, handleApplyCoupon, promoCodeLoading } = props;
  return (
    <>
      <div className="position-relative coupon-box">
        <Form.Control
          aria-label="Default select example"
          className="coupon-input position-relative border-color-2"
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <span
          className="fw-500 apply-coupon cursor-pointer"
          onClick={handleApplyCoupon}
        >
          Apply
        </span>
        {promoCodeLoading && (
          <FontAwesomeIcon
            className="payment-loader"
            icon={faRedo}
            width={25}
          />
        )}
      </div>
    </>
  );
}

export default PromoCodeBox;
