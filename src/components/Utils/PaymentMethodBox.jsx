import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";

function PaymentMethodBox(props) {
  const { setSelectedPayment, paymentOption, paymentLoading } = props;
  return (
    <>
      <div className="position-relative payment-box">
        <Form.Select
          aria-label="Default select example"
          className="payment-method position-relative border-color-2"
          onChange={(e) => setSelectedPayment(e.target.value)}
        >
          <option value={""}>Select Method</option>
          {paymentOption?.map(
            (item, key) =>
              item.action && (
                <option className="" value={item.id} kye={key}>
                  {item.name}
                </option>
              )
          )}
        </Form.Select>

        {paymentLoading && (
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

export default PaymentMethodBox;
