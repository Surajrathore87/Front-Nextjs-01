import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";
import PaymentMethodBox from "../../Utils/PaymentMethodBox";
import PromoCodeBox from "../../Utils/PromoCodeBox";

function LocalSummary(props) {
  const {
    bookingData,
    paymentOption,
    setSelectedPayment,
    handleApplyCoupon,
    setPromoCode,
    paymentLoading,
    promoCodeLoading,
  } = props;

  return (
    <>
      <div className="bg-color-2 label-color-6 rounded mt-4">
        <div className="fs-24 d-flex py-md-4 py-2 border-bottom px-md-5 px-3">
          {/* <span>07 NOVEMBER 2021, 2:00 PM</span> */}
          <span className="">Fair Summary</span>
        </div>

        <div className="d-md-flex gap-5 py-3 border-bottom px-md-5 px-3">
          <div>
            <p className="label-color-7 fs-24 mb-0 taxi-heading">
              Estimated Distance
            </p>
            <span className="fs-22 taxi-sub-heading text-white">
              {bookingData?.estimate_distance}
            </span>
          </div>
          <div>
            <p className="label-color-7 fs-24 mb-0 taxi-heading">
              Estimated Time
            </p>
            <span className="fs-22 taxi-sub-heading text-white">
              {bookingData?.estimate_time}
            </span>
          </div>
        </div>

        <div className="d-md-flex total-amount-box px-md-5 px-3 py-md-4 py-2">
          <div className="d-flex align-items-center">
            <div className="booking-ride-img">
              <img
                src={bookingData?.vehicleTypeImage}
                alt=""
                className="me-md-4 me-2"
                width={100}
              />
            </div>
            <h3 className="fs-30 fw-600 m-0 text-uppercase">
              {bookingData?.vehicleTypeName}
            </h3>
          </div>
          <div className="ms-auto mt-md-3 text-end">
            <h4 className="fs-18 m-0">Total Amount</h4>
            <p className="fs-34 fw-600 taxi-sub-heading text-white">
              {bookingData?.estimate_bill}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-md-5 mt-3 label-color-1">
        <div className="d-md-flex">
          <div className="me-lg-5 me-md-4 me-0">
            <h6 className="fs-26 fw-600 mb-md-3 taxi-heading label-color-1">
              Payment Method
            </h6>
            <PaymentMethodBox
              setSelectedPayment={setSelectedPayment}
              paymentOption={paymentOption}
              paymentLoading={paymentLoading}
            />
          </div>

          <div className=" ms-lg-5 ms-md-4 ms-0 pt-4 pt-md-0">
            <h6 className="fs-26 fw-600 mb-md-3 label-color-1 taxi-heading">
              Coupon
            </h6>
            <PromoCodeBox
              setPromoCode={setPromoCode}
              handleApplyCoupon={handleApplyCoupon}
              promoCodeLoading={promoCodeLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LocalSummary;
