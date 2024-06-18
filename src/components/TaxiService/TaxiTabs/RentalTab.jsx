import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkoutForRide } from "../../../services/taxi_service_api";

const CabSelection = dynamic(import("../fields/CabSelection"));
const PackageSelection = dynamic(import("../fields/PackageSelection"));
const DateAndTimeSelection = dynamic(
  import("../../Utils/DateAndTimeSelection")
);

function RentalTab(props) {
  const {
    serviceData,
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    areaCode,
  } = props;
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
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
    getPackageVehicles();
  }, [selectedPackage]);

  useEffect(() => {
    setVehicleId(vehicles?.[0]?.id);
  }, [selectedPackage, vehicles]);

  //set vehicles according to package selection
  function getPackageVehicles() {
    serviceData?.package?.filter(
      (item) => item.id == selectedPackage && setVehicles(item.vehicles)
    );
  }

  // checkout ride
  async function handleCheckoutRide() {
    if (pickupAddress && dropAddress && selectedPackage && date && time) {
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
        booking_type: 2,
        area: areaCode,
        pickup_latitude: pickupLocation.lat,
        drop_location: dropLocationArr,
        pick_up_locaion: pickupAddress,
        service_package_id: selectedPackage,
        number_of_rider: 0,

        later_time: time,
        later_date: date,
      };

      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });

      setIsCheckoutLoaded(false);

      const { response } = await checkoutForRide(formData);
      if (response.status) {
        localStorage.setItem("taxi-booking", JSON.stringify(response.data));
        router.push("/taxi-service/confirm-booking");
        setIsCheckoutLoaded(true);
      } else {
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
        setIsCheckoutLoaded(true);
      }
    } else {
      toastConfig["type"] = "error";
      (!pickupAddress && toast("Please select pickup location", toastConfig)) ||
        (!dropAddress && toast("Please select drop location", toastConfig)) ||
        (!selectedPackage && toast("Please select package", toastConfig)) ||
        ((!date || !time) && toast("Please select date and time", toastConfig));
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="mt-4">
            <PackageSelection
              packageData={serviceData?.package}
              setSelectedPackage={setSelectedPackage}
            />

            {selectedPackage && (
              <CabSelection cabsData={vehicles} setVehicleId={setVehicleId} />
            )}

            <div className="mb-4">
              <h6 className="fs-26 fw-600  mb-3 label-color-1">
                Select Date and Time
              </h6>
              <DateAndTimeSelection setDate={setDate} setTime={setTime} />
            </div>

            <div className="d-flex mt-5">
              <button
                type="button"
                className={`search-btn ms-auto text-uppercase ${
                  !isCheckoutLoaded ? "btn-disabled" : ""
                }`}
                title="Proceed"
                onClick={handleCheckoutRide}
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

export default RentalTab;
