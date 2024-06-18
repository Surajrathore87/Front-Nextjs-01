import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function OrderLocation(props) {
  const { pickup, dropoff } = props;
  return (
    <>
      <div className="py-3">
        <div className="location-box d-flex pb-2">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-danger fs-20 me-2 mt-1"
          />
          <p className="font-sfpro fw-400 label-color-3 fs-20">
            Pick Up : {pickup}
          </p>
        </div>
        <div className="d-flex ">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-success fs-20 me-2 mt-1"
          />
          <p className="font-sfpro fw-400 label-color-3 fs-20">
            Drop Off :{dropoff}
          </p>
        </div>
      </div>
    </>
  );
}
export default OrderLocation;
