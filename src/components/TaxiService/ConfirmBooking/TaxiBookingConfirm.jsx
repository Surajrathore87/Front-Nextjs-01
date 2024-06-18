import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  applyPromoCodeHandler,
  confirmRideHandler,
  getPaymentOptions,
  selectPaymentHandler,
} from "../../../services/taxi_service_api";
import Layout from "../../Layouts/Layout";
import Container from "../../Utils/Container";

const TaxiConfirmModal = dynamic(import("../../modals/TaxiConfirmModal"));

const LocalSummary = dynamic(import("./LocalSummary"));
const FullPageLoader = dynamic(import("../../Utils/FullPageLoader"));

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});
const mapDispatchToProps = (dispatch) => ({});

function TaxiBookingConfirm(props) {
  const { isLoggedIn } = props;
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [isPaymentAvailable, setIsPaymentAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [promoCodeLoading, setPromoCodeLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const router = useRouter();

  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem("taxi-booking")) {
      setBookingData(JSON.parse(localStorage.getItem("taxi-booking")));
    } else {
      router.push("/taxi-service");
      return;
    }
  }, []);

  useEffect(() => {
    if (selectedPayment) {
      handleSelectPayment();
    }
  }, [selectedPayment]);

  useEffect(() => {
    if (bookingData) {
      getPaymentList();
    }
  }, [bookingData]);

  //payment option list
  async function getPaymentList() {
    const params = {
      checkout_id: bookingData?.id,
    };

    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

    const { response } = await getPaymentOptions(formData);
    if (response.status) {
      setPaymentOption(response.data);
    }
    setIsLoading(false);
  }

  //select payment option
  async function handleSelectPayment() {
    setPaymentLoading(true);
    const params = {
      checkout: bookingData?.id,
      payment_method_id: bookingData.SelectedPaymentMethod.id,
    };
    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    const { response } = await selectPaymentHandler(formData);
    if (response.status) {
      setBookingData(response.data);
      setIsPaymentAvailable(true);
      setPaymentLoading(false);
    } else {
      setPaymentLoading(false);
      toastConfig["type"] = "error";
      toast(response.message, toastConfig);
      setIsPaymentAvailable(false);
    }
  }

  //check promo code
  async function handleApplyCoupon() {
    if (promoCode) {
      setPromoCodeLoading(true);
      const params = {
        checkout_id: bookingData?.id,
        promo_code: promoCode,
      };
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
      const { response } = await applyPromoCodeHandler(formData);
      if (response.status) {
        setBookingData(response.data);
        toastConfig["type"] = "success";
        toast(response.message, toastConfig);
        setPromoCodeLoading(false);
      } else {
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
        setPromoCodeLoading(false);
      }
    }
  }

  //confirm ride
  async function handleConfirmRide() {
    if (selectedPayment && isPaymentAvailable) {
      const params = {
        checkout: bookingData?.id,
        segment_id: 1,
      };
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });

      setCheckoutLoading(true);
      const { response } = await confirmRideHandler(formData);
      if (response.status) {
        setBookingId(response.data.id);
        localStorage.removeItem("taxi-booking");
        setShowModal(true);
        setCheckoutLoading(false);
      } else {
        setCheckoutLoading(false);
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
      }
    } else {
      toastConfig["type"] = "error";
      toast("Please Select Correct Payment Method", toastConfig);
    }
  }

  function closeBookingModal() {
    setShowModal(false);
    router.push("/my-order?tab=taxi");
  }

  return (
    <>
      <Layout>
        <TaxiConfirmModal
          show={showModal}
          onHide={closeBookingModal}
          bookingId={bookingId}
        />
        <Container isLoading={isLoading}>
          <section className="taxi-banner mt-70 w-100"></section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="confirm-booking p-md-5 px-3 py-4 rounded w-100 m-auto">
                  <div className="d-flex gap-4 align-items-center">
                    <Link href={"/taxi-service"}>
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="fs-3 cursor-pointer"
                      />
                    </Link>
                    <h1 className="fs-28 fw-600 taxi-heading font-proxima m-0">
                      CONFIRM BOOKING
                    </h1>
                  </div>

                  <div className="bg-color-1 mt-md-5 mt-3 px-md-5 px-3 py-2 ">
                    <div className="mt-2">
                      <span className="label-color-success taxi-heading fs-22 font-proxima">
                        Pick Up Location
                      </span>
                      <p className="fs-24 taxi-sub-heading font-sfpro ms-2">
                        {bookingData?.pickup_location}
                      </p>
                    </div>
                    <div>
                      <span className="label-color-danger taxi-heading fs-22 font-proxima">
                        Drop Location
                      </span>
                      <p className="fs-24 taxi-sub-heading font-sfpro ms-2">
                        {bookingData?.drop_location}
                      </p>
                    </div>
                  </div>

                  <LocalSummary
                    bookingData={bookingData}
                    paymentOption={paymentOption}
                    setSelectedPayment={setSelectedPayment}
                    handleApplyCoupon={handleApplyCoupon}
                    setPromoCode={setPromoCode}
                    paymentLoading={paymentLoading}
                    promoCodeLoading={promoCodeLoading}
                  />

                  <div className="d-flex mt-5">
                    <button
                      type="button"
                      className={`search-btn ms-auto text-uppercase ${
                        checkoutLoading ? "btn-disabled" : ""
                      }`}
                      title="confirm"
                      onClick={handleConfirmRide}
                      disabled={checkoutLoading}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxiBookingConfirm);
