import React, { useState } from "react";
import { Form } from "react-bootstrap";

function SelectPackageInput(props) {
  const { packageData, setSelectedPackage } = props;
  return (
    <>
      <div className="mb-4">
        <h6 className="fs-26 fw-600 mb-3 label-color-1">Select Package</h6>
        <div className="d-flex">
          <div className="position-relative package-box">
            <Form.Select
              aria-label="Default select example"
              className="select-package position-relative border-color-1"
              onChange={(e) => setSelectedPackage(e.target.value)}
            >
              <option value={""} className="fs-22">
                Select Package
              </option>
              {packageData?.map((item, key) => (
                <option value={item.id} key={key} className="fs-22 ">
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPackageInput;
