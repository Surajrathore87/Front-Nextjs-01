import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { locator } from "../../constants/imagesContains";

const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function ACompleteWithCurrLocation(props) {
  const {
    setLocation,
    setAddress,
    inputClass,
    parentClass,
    iconSize,
    iconClass,
  } = props;
  const searchInput = useRef(null);

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=AIzaSyAM4zhLnNffu6ll3P-3POGmOrhzi6i3xDI&latlng=${lat},${lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const fullAddress = place.formatted_address;
        searchInput.current.value = fullAddress;
        setLocation({ lat, lng });
        setAddress(fullAddress);
      });
  };

  //get current location latitude and longitude
  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // auto complete location input
  function autoCompleteAddress() {
    const autocomplete = new google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const fullAddress = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      setAddress(fullAddress);
    });
    searchInput.current.value === "" && setAddress("");
    searchInput.current.value === "" && setLocation(null);
  }

  return (
    <>
      <div className={`${parentClass} position-relative`}>
        <Form.Control
          ref={searchInput}
          name="searchLocation"
          placeholder="Enter Your Location"
          className={`${inputClass} `}
          onChange={autoCompleteAddress}
        />
        <div className={`position-absolute ${iconClass}`}>
          <img
            src={locator}
            alt=""
            width={iconSize}
            className="cursor-pointer"
            onClick={findMyLocation}
          />
        </div>
      </div>
    </>
  );
}

export default ACompleteWithCurrLocation;
