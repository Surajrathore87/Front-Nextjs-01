import dynamic from "next/dynamic";
import React, { useState } from "react";
import { getTaxiCancelReasons } from "../../../services/taxi_service_api";
import OrderLocation from "../../Orders/OrderLocation";
import TaxiCancelModal from "./TaxiCancelModal";

function TaxiSummary(props) {
  const { bookingSummaryData, setCancellationLoading, setBookingCancelled } =
    props;
  const [cancellationReasons, setCancellationReasons] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const bookingId =
    bookingSummaryData.holder_driver_vehicle_rating.vehicle_data.booking_id;

  async function handleGetCancellationReasons() {
    setCancellationLoading(true);
    const params = {
      segment_id: 1,
      booking_id: bookingId,
    };
    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    const { response } = await getTaxiCancelReasons(formData);
    setCancellationLoading(false);

    if (response.status) {
      setCancellationReasons(response.data);
      setShowModal(true);
    }
  }

  return (
    <>
      {showModal && (
        <TaxiCancelModal
          showModal={showModal}
          setShowModal={setShowModal}
          bookingId={bookingId}
          cancellationReasons={cancellationReasons}
          setBookingCancelled={setBookingCancelled}
        />
      )}

      <div>
        <div className="booking-summery-box px-3 py-4">
          <div>
            <p className="text-dark fw-500 font-sfpro fs-26 border-bottom pb-2">
              ORDER : #
              {
                bookingSummaryData.holder_driver_vehicle_rating.vehicle_data
                  .booking_id
              }
            </p>
          </div>
          <OrderLocation
            pickup={bookingSummaryData.holder_pickdrop_location.data.pick_text}
            dropoff={bookingSummaryData.holder_pickdrop_location.data.drop_text}
          />
          {bookingSummaryData.holder_driver.visibility && (
            <div>
              <p className="text-dark fw-400 mb-0 font-sfpro fs-23 ">Details</p>
              <div className=" border-bottom py-3">
                <div className="d-flex">
                  <div className="fs-22 font-sfpro fw-400 text-dark w-50">
                    Driver
                  </div>
                  <div className="fs-22 font-sfpro fw-400 text-dark w-50 text-end">
                    Contact no.
                  </div>
                </div>
                <div className="d-flex mt-1">
                  <div className="fs-21 font-sfpro fw-400 w-50 label-color-10">
                    {
                      bookingSummaryData.bookingSummaryData.data
                        .highlighted_text
                    }
                  </div>
                  <div className="fs-21 font-sfpro fw-400 w-50 label-color-10 text-end">
                    {bookingSummaryData.holder_driver.data.small_taxt_phone}
                  </div>
                </div>
              </div>
            </div>
          )}

          {bookingSummaryData.holder_receipt.visibility && (
            <div>
              <p className="text-dark fw-400 mb-0 font-sfpro fs-23 ">Receipt</p>
              <div className="py-3">
                {bookingSummaryData.holder_receipt.data.map((item, key) => (
                  <div key={key} className="d-flex">
                    <div className="fs-22 font-sfpro fw-400 label-color-10 w-50">
                      {item.highlighted_text}
                    </div>
                    <div className="fs-22 font-sfpro fw-400 label-color-10 w-50 text-end">
                      {item.value_text}
                    </div>
                  </div>
                ))}
              </div>
              {/*  */}
            </div>
          )}
        </div>
        {bookingSummaryData.button_visibility.cancel && (
          <div className="mt-4 text-end">
            <button
              type="button"
              onClick={handleGetCancellationReasons}
              className="text-uppercase cancel-btn fs-26 px-5 py-2 font-proxima cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default TaxiSummary;
