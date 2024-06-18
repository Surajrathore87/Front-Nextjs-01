import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { checkoutForRide } from "../../../services/taxi_service_api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CabSelection = dynamic(import("../fields/CabSelection"));
const DateAndTimeSelection = dynamic(
  import("../../Utils/DateAndTimeSelection")
);

function LocalTab(props) {
  const {
    serviceData,
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    areaCode,
  } = props;

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [activeBtn, setActiveBtn] = useState("rideNow");
  const [vehicleId, setVehicleId] = useState(null);
  const [isCheckoutLoaded, setIsCheckoutLoaded] = useState(true);

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
    setVehicleId(serviceData?.vehicles?.[0]?.id);
  }, [serviceData]);

  // check ride availability and checkout
  async function handleCheckoutRide() {
    if (
      (pickupAddress && dropAddress && activeBtn == "rideNow") ||
      (activeBtn == "rideLater" && pickupAddress && dropAddress && date && time)
    ) {
      const bookingType = activeBtn == "rideNow" ? "1" : "2";
      const rideTime = activeBtn == "rideLater" ? time : "";
      const rideDate = activeBtn == "rideLater" ? date : "";
      const dropLocationArr = JSON.stringify([
        {
          stop: 0,
          drop_location: dropAddress,
          status: "1",
          drop_longitude: dropLocation?.lng,
          drop_latitude: dropLocation?.lat,
        },
      ]);
      const params = {
        pickup_longitude: pickupLocation.lng,
        segment_id: 1,
        vehicle_type: vehicleId,
        service_type: serviceData.id,
        total_drop_location: 1,
        booking_type: bookingType,
        area: areaCode,
        pickup_latitude: pickupLocation.lat,
        drop_location: dropLocationArr,
        pick_up_locaion: pickupAddress,
        service_package_id: "",
        number_of_rider: 0,
        later_time: rideTime,
        later_date: rideDate,
      };

      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
      setIsCheckoutLoaded(false);
      const { response } = await checkoutForRide(formData);
      if (response.status) {
        localStorage.setItem("taxi-booking", JSON.stringify(response.data));
        setIsCheckoutLoaded(true);
        router.push("/taxi-service/confirm-booking");
      } else {
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
        setIsCheckoutLoaded(true);
      }
    } else {
      toastConfig["type"] = "error";
      (!pickupAddress && toast("Please select pickup location", toastConfig)) ||
        (!dropAddress && toast("Please select drop location", toastConfig)) ||
        (activeBtn == "rideLater" &&
          (!date || !time) &&
          toast("Please select date and time", toastConfig));
    }
  }

  const handleChangeRideBtn = (name) => {
    setActiveBtn(name);
    setDate(null);
    setTime(null);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="mt-4">
            <CabSelection
              cabsData={serviceData.vehicles}
              setVehicleId={setVehicleId}
            />

            <div className="d-flex my-5 gap-5">
              <button
                type="button"
                title="Ride Now"
                className={`bg-white border-1 rounded px-5 py-2 fs-22 text-uppercase ${
                  activeBtn == "rideNow" ? "active-ride-btn" : ""
                }`}
                onClick={() => handleChangeRideBtn("rideNow")}
              >
                Ride Now
              </button>
              <button
                type="button"
                title="Ride Later"
                onClick={() => handleChangeRideBtn("rideLater")}
                className={`bg-white border-1 rounded px-5 py-2 fs-22 text-uppercase ${
                  activeBtn == "rideLater" ? "active-ride-btn" : ""
                }`}
              >
                Ride Later
              </button>
            </div>

            {activeBtn == "rideLater" && (
              <>
                <div className="mb-4">
                  <h6 className="fs-26 fw-600  mb-3 label-color-1">
                    Select Date and Time
                  </h6>
                  <DateAndTimeSelection setDate={setDate} setTime={setTime} />
                </div>
              </>
            )}

            <div className="d-flex mt-5">
              <button
                type="button"
                className={`search-btn ms-auto text-uppercase ${
                  !isCheckoutLoaded ? "btn-disabled" : ""
                }`}
                title="Proceed"
                onClick={handleCheckoutRide}
                disabled={!isCheckoutLoaded}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocalTab;
