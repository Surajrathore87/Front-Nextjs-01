import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";

function AutoCompleteLocation(props) {
  const { setLocation, setAddress, classess } = props;
  const searchInput = useRef(null);

  function autoCompleteAddress() {
    const autocomplete = new google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const lat = place?.geometry?.location.lat();
      const lng = place?.geometry?.location.lng();
      setLocation({ lat, lng });
      setAddress(searchInput.current.value);
    });

    searchInput.current.value === "" && setAddress("");
    searchInput.current.value === "" && setLocation(null);
  }

  return (
    <>
      <Form.Control
        type="input"
        ref={searchInput}
        placeholder="Enter your location"
        className={classess}
        onChange={autoCompleteAddress}
      />
    </>
  );
}

export default AutoCompleteLocation;
