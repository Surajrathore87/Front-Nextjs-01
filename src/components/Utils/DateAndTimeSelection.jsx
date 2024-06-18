import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import moment from "moment";

function DateAndTimeInputs(props) {
  const { setDate, setTime } = props;

  return (
    <>
      <div className="d-flex gap-3">
        <div className="datepicker-toggle">
          <FormControl
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="date-picker me-5 border-color-1"
            min={moment().format("YYYY-MM-DD")}
          />
        </div>
        <div className="datepicker-toggle">
          <FormControl
            type="time"
            onChange={(e) => setTime(e.target.value)}
            className="time-picker border-color-1"
          />
        </div>
      </div>
    </>
  );
}

export default DateAndTimeInputs;
