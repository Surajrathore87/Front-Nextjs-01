import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";

function ConfirmedBooking(props) {
  const { bookingId } = props;
  const router = useRouter();

  function bookingDone() {
    router.push("/my-order");
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="login-modal"
    >
      <Modal.Header closeButton className="border-0 p-md-4 align-items-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className=" font-proxima fs-26 fw-600 px-md-3 taxi-heading text-center w-100 mt-4 pb-md-4 pb-2"
        >
          Thank You ! For Booking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center py-md-4 login-modal">
          <p className="fs-24 fw-600 label-color-success">
            Your Ride is Booked
          </p>
          <p className="fs-20 m-0 label-color-1">
            Your Booking ID:{" "}
            <span className="fs-22 label-color-11">{bookingId}</span>
          </p>

          <div>
            <button
              type="button"
              className="search-btn py-2 px-3 fs-4 rounded mt-3 "
              onClick={bookingDone}
            >
              Done
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmedBooking;
