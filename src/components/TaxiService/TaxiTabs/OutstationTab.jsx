import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  getOutstationServiceData,
  checkoutForRide,
} from "../../../services/taxi_service_api";

const TripSelection = dynamic(import("../fields/TripSelection"));
const DateAndTimeSelection = dynamic(
  import("../../Utils/DateAndTimeSelection")
);
const OutstationCabs = dynamic(import("../fields/OutstationCabs"));
const Loader = dynamic(import("../../Utils/Loader"));

function OutstationTab(props) {
  const {
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    areaCode,
    serviceData,
  } = props;

  const [leaveDate, setLeaveDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [leaveTime, setLeaveTime] = useState();
  const [returnTime, setReturnTime] = useState();
  const [tripType, setTripType] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [cabData, setCabData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (cabData?.single?.length > 0) {
      setTripType("oneWay");
    } else if (cabData?.round?.length > 0) {
      setTripType("roundTrip");
    }
  }, [cabData]);

  useEffect(() => {
    handlegetOutstationServiceDataData();
  }, [pickupAddress, dropAddress]);

  //check outstation ride availability and load cab details
  async function handlegetOutstationServiceDataData() {
    if (dropLocation && pickupLocation) {
      setIsLoading(true);
      const params = {
        drop_long: dropLocation?.lng,
        segment_id: 1,
        service_type: 4,
        pickup_long: pickupLocation?.lng,
        pickup_lat: pickupLocation?.lat,
        drop_lat: dropLocation?.lat,
        area: areaCode,
      };

      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });

      const { response } = await getOutstationServiceData(formData);

      if (response.status) {
        setCabData(response.data);
        setIsLoading(false);
        setLeaveDate(null);
        setLeaveTime(null);
        // toastConfig["type"] = "success";
        // toast(response.message, toastConfig);
      } else {
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
      }
    } else {
      // toastConfig["type"] = "error";
      // toast("Please select both pickup and drop location", toastConfig);
    }
  }

  // checkout ride
  async function handleCheckoutRide(params) {
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
  }

  // params for ride checkout
  function handleBookRide() {
    if (pickupAddress && dropAddress) {
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
        service_type: serviceData.id,
        vehicle_type: vehicleId,
        area: areaCode,
        pickup_latitude: pickupLocation.lat,
        pickup_longitude: pickupLocation.lng,
        total_drop_location: 1,
        drop_location: dropLocationArr,
        booking_type: 2,
        pick_up_locaion: pickupAddress,
        service_package_id: "",
        return_date: returnDate || "",
        return_time: returnTime || "",
        later_time: leaveTime,
        later_date: leaveDate,
        segment_id: 1,
      };

      if (tripType === "oneWay" && leaveDate && leaveTime) {
        handleCheckoutRide(params);
      } else if (tripType === "oneWay") {
        toastConfig["type"] = "error";
        toast("Please select leave date and time", toastConfig);
      }

      if (
        tripType === "roundTrip" &&
        leaveDate &&
        leaveTime &&
        returnDate &&
        returnTime
      ) {
        handleCheckoutRide(params);
      } else if (tripType === "roundTrip") {
        toastConfig["type"] = "error";
        ((!leaveDate || !leaveTime) &&
          toast("Please select leave date and time", toastConfig)) ||
          ((!returnDate || !returnTime) &&
            toast("Please select return date and time", toastConfig));
      }
    } else {
      toastConfig["type"] = "error";
      (!pickupAddress && toast("Please select pickup location", toastConfig)) ||
        (!dropAddress && toast("Please select drop location", toastConfig));
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="mt-4">
            {(isLoading && <Loader />) || (
              <>
                {cabData && (
                  <TripSelection
                    setTripType={setTripType}
                    cabData={cabData}
                    tripType={tripType}
                    setDate={setReturnDate}
                    setTime={setReturnTime}
                  />
                )}

                {tripType == "roundTrip" && (
                  <OutstationCabs
                    cabData={cabData.round}
                    setVehicleId={setVehicleId}
                  />
                )}

                {tripType == "oneWay" && (
                  <OutstationCabs
                    cabData={cabData.single}
                    setVehicleId={setVehicleId}
                  />
                )}

                {(tripType == "oneWay" || tripType == "roundTrip") && (
                  <div className="mb-4">
                    <h6 className="fs-26 fw-600  mb-3 label-color-1">
                      Leave Time
                    </h6>
                    <DateAndTimeSelection
                      setDate={setLeaveDate}
                      setTime={setLeaveTime}
                      tripType={tripType}
                    />
                  </div>
                )}

                {tripType == "roundTrip" && (
                  <div className="mb-4">
                    <h6 className="fs-26 fw-600  mb-3 label-color-1">
                      Return Time
                    </h6>
                    <DateAndTimeSelection
                      setDate={setReturnDate}
                      setTime={setReturnTime}
                      tripType={tripType}
                    />
                  </div>
                )}

                <div className="d-flex mt-5">
                  {/* <button
                    type="button"
                    className="search-btn ms-auto"
                    title="Search"
                    // onClick={handlegetOutstationServiceDataData}
                  >
                    Search
                  </button> */}

                  {cabData && (
                    <button
                      type="button"
                      className={`search-btn ms-auto text-uppercase ${
                        !isCheckoutLoaded ? "btn-disabled" : ""
                      }`}
                      title="Proceed"
                      onClick={handleBookRide}
                    >
                      Proceed
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OutstationTab;
