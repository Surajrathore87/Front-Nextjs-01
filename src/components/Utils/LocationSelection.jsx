import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import ACompleteWithCurrLocation from "./ACompleteWithCurrLocation";

const AutoCompleteLocation = dynamic(import("./AutoCompleteLocation"));

function LocationFieldInput(props) {
  const {
    setPickupLocation,
    setPickupAddress,
    setDropLocation,
    setDropAddress,
  } = props;

  return (
    <>
      <div>
        <Form.Group className="mb-md-4 mb-3" controlId="formBasicEmail">
          <div className="d-flex align-items-center">
            <Form.Label className="fs-26 mb-0 mb-md-2 label-color-1">
              <span className="fw-600 courier-heading"> Pick Up </span>
            </Form.Label>
            {/* <div className="ms-auto cursor-pointer">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="label-color-3 fs-20"
              />
              <span className="ms-2 label-color-2 fs-22">Find a location</span>
            </div> */}
          </div>
          {/* <AutoCompleteLocation
            setLocation={setPickupLocation}
            setAddress={setPickupAddress}
            classess="input-bar border-color-1"
          /> */}

          <ACompleteWithCurrLocation
            inputClass="input-bar border-color-1"
            parentClass="w-100"
            iconClass="locator"
            iconSize={25}
            setLocation={setPickupLocation}
            setAddress={setPickupAddress}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicEmail">
          <div className="d-flex align-items-center">
            <Form.Label className="fs-26 mb-0 mb-md-2 label-color-1">
              <span className="fw-600 courier-heading"> Drop Off </span>
            </Form.Label>
            {/* <div className="ms-auto cursor-pointer">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="label-color-3 fs-20"
              />
              <span className="ms-2 label-color-2 fs-22">Find a location</span>
            </div> */}
          </div>
          <AutoCompleteLocation
            setLocation={setDropLocation}
            setAddress={setDropAddress}
            classess="input-bar border-color-1"
          />
        </Form.Group>
      </div>
    </>
  );
}

export default LocationFieldInput;
