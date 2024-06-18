import React from "react";

function TaxiPastTab(props) {
  const { orderData, bookingId, setBookingId } = props;

  return (
    <>
      <div className="py-4 px-4 pb-3 order-items-box">
        {orderData &&
          orderData.map((item, key) => (
            <div
              className={`border bg-white py-3 cursor-pointer mb-3 rounded ${
                bookingId === item.booking_id
                  ? "bg-white order-active-shadow "
                  : ""
              }`}
              key={key}
              onClick={() => setBookingId(item.booking_id)}
            >
              <div className="border-bottom px-4 d-flex align-items-center">
                <div className="col">
                  <p className="text-dark fw-500 font-sfpro fs-22 mb-0">
                    ORDER : #{item.booking_id}
                  </p>
                </div>
                <div className="col text-end">
                  <span className="fs-22 font-sfpro fw-500">
                    {item.vehicle_type}{" "}
                    <img
                      src={item.circular_image}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </span>
                </div>
              </div>
              <div className=" border-bottom py-3 ">
                <div className="d-flex px-4 pb-3">
                  <div className="w-75 d-flex">
                    <div className="fs-22 mb-0 font-sfpro fw-500 text-dark text-nowrap">
                      Pick Up :&nbsp;&nbsp;
                    </div>
                    <p className="fs-20 mb-0 font-sfpro fw-500 label-color-3">
                      {item.pick_text}
                    </p>
                  </div>
                  <div className="w-25 text-end">
                    <p className="fs-26 mb-0 font-porxima fw-600 label-color-24">
                      INR {item.estimate_bill}
                    </p>
                  </div>
                </div>
                <div className="d-flex px-4">
                  <div className="w-75 d-flex">
                    <div className="fs-22 mb-0 font-sfpro fw-500 text-dark text-nowrap">
                      DropOff :&nbsp;&nbsp;
                    </div>
                    <p className="fs-20 mb-0 font-sfpro fw-500 label-color-3">
                      {item.drop_location}
                    </p>
                  </div>
                  <div className="w-25 text-end">
                    <p className="fs-18 font-porxima fw-400 label-color-10">
                      <i>Payment type: {item.payment_method}</i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex px-4 mt-3">
                <div className="w-50">
                  <p className="fs-22 font-sfpro fw-500 label-color-3">
                    Booked on {item.small_text}
                  </p>
                </div>
                <div className=" ms-auto">
                  <p className="fs-22 font-sfpro fw-500 label-color-2">
                    {item.highlighted_text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {!orderData && <h2 className="text-center">No Data Found</h2>}
      </div>
    </>
  );
}
export default TaxiPastTab;
