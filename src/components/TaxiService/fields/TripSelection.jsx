import React from "react";
import { Form } from "react-bootstrap";

function RadioInput(props) {
  const { setTripType, cabData, setDate, setTime } = props;

  const handleChangeTripType = (trip) => {
    setTripType(trip);
    setDate(null);
    setTime(null);
  };

  return (
    <>
      <div className="mb-3 mt-5">
        <div className="d-flex fs-20">
          <div className="d-flex align-items-start me-5 ">
            <Form.Check
              name="group1"
              type="radio"
              value={"oneWay"}
              id="inline-1"
              inline
              className="mt-1"
              onChange={(e) => handleChangeTripType(e.target.value)}
              defaultChecked={cabData?.single?.length > 0}
              disabled={cabData?.single?.length <= 0}
            />
            <Form.Label htmlFor="inline-1" className="cursor-pointer">
              <span
                className={`fw-600 fs-26 label-color-1 ${
                  cabData?.single?.length <= 0 ? "label-color-4" : ""
                }`}
              >
                One Way
              </span>
              <p className="fw-400 fs-20 label-color-4">Get Dropped Off</p>
            </Form.Label>
          </div>
          <div className="d-flex align-items-start ms-5">
            <Form.Check
              name="group1"
              type="radio"
              id="inline-2"
              value={"roundTrip"}
              inline
              className="mt-1"
              onChange={(e) => handleChangeTripType(e.target.value)}
              defaultChecked={
                cabData?.round?.length > 0 && cabData?.single?.length <= 0
              }
            />
            <Form.Label htmlFor="inline-2" className="cursor-pointer">
              <span className="fw-600 fs-26 label-color-1"> Round Trip</span>
              <p className="fw-400 fs-20 label-color-4">Keep Car Till Return</p>
            </Form.Label>
          </div>
        </div>
      </div>
    </>
  );
}

export default RadioInput;
