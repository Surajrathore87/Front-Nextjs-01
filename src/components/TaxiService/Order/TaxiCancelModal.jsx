import { useRouter } from "next/router";
import React, { useState } from "react";
import { Form, FormGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { taxiBookingCancel } from "../../../services/taxi_service_api";

function TaxiCancelModal(props) {
  const {
    showModal,
    setShowModal,
    cancellationReasons,
    bookingId,
    setBookingCancelled,
  } = props;
  const [reasonId, setReasonId] = useState(null);
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

  async function handleCancelBooking() {
    if (!reasonId) {
      toast.error("Please select a reason", toastConfig);
      return;
    }
    const params = {
      booking_id: bookingId,
      cancel_reason_id: reasonId,
      cancel_charges: cancellationReasons.cancel_charges,
    };

    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    const { response } = await taxiBookingCancel(formData);

    setShowModal(false);
    if (response.status) {
      setBookingCancelled(true);
      router.push("/my-order?tab=taxi");
      toast.success(response.message, toastConfig);
    } else {
      toast.error(response.message, toastConfig);
    }
  }

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className=" align-items-center ">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="font-proxima fs-26 fw-600 label-color-8 text-center w-100"
        >
          Booking Cancellation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-left px-4">
          <div className="fs-22 label-color-3">
            {cancellationReasons?.response_data.map((item, key) => (
              <div key={key} className="d-flex gap-3 align-items-center">
                <Form.Check
                  name="radio"
                  type="radio"
                  id={item.id}
                  className="cursor-pointer"
                  onChange={() => setReasonId(item.id)}
                />
                <Form.Label htmlFor={item.id} className="cursor-pointer">
                  {item.reason}
                </Form.Label>
              </div>
            ))}
          </div>
          <p className="text-danger text-end fs-20">
            Cancellation Charge : INR {cancellationReasons.cancel_charges}
          </p>
          <div className="text-center">
            <button
              type="button"
              className="text-uppercase cancel-btn fs-20 mt-3 px-4 py-2 font-proxima cursor-pointer"
              onClick={handleCancelBooking}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TaxiCancelModal;
