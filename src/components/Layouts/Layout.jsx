import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getConfigurationData, getUserData } from "../../services/user";
import {
  setConfigData,
  setShowLoggedInPopup,
  setShowRegisterPopup,
  setUserLocation,
  userData,
} from "../../_redux/actions";
import Container from "../Utils/Container";
import FullPageLoader from "../Utils/FullPageLoader";

const Header = dynamic(import("../Header/Header"));
const Footer = dynamic(import("../Header/Footer"));
const LoginModal = dynamic(import("../modals/LoginModal"));
const RegisterModal = dynamic(import("../modals/RegisterModal"));

const mapStateToProps = (state) => ({
  isLoggedInPopup: state.user.isLoggedInPopup,
  isRegisterPopup: state.user.isRegisterPopup,
  userData: state.user.userData,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setShowLoggedInPopup: (data) => {
    dispatch(setShowLoggedInPopup(data));
  },
  setShowRegisterPopup: (data) => {
    dispatch(setShowRegisterPopup(data));
  },
  setUserData: (data) => {
    dispatch(userData(data));
  },
  setUserLocation: (data) => {
    dispatch(setUserLocation(data));
  },
  setConfigData: (data) => {
    dispatch(setConfigData(data));
  },
});

function Layout(props) {
  const {
    children,
    isLoggedInPopup,
    isRegisterPopup,
    setShowLoggedInPopup,
    setShowRegisterPopup,
    userData,
    setUserData,
    isLoggedIn,
    setUserLocation,
    setConfigData,
  } = props;

  useEffect(() => {
    if (isLoggedIn) {
      getUserDataHandler();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleGetConfigData();
  }, []);

  async function handleGetConfigData() {
    const params = {
      //longitude: 77.01219335468281 ,
      player_id: "cf86af69-6ef3-41a2-bcbe-a78440bddb43",
      operating_system: "IOS",
      package_name: "com.multiservice.user",
      manufacture: "iPhone",
      device: 2,
      model: "iPhone",
      user_id: 0,
      //latitude: 28.983035875111995,
      language_code: "en",
      unique_no: "B26A3344-F742-4442-A321-C741EA1D36B0",
      apk_version: 2.0,
    };

    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    const { response } = await getConfigurationData(formData);

    if (response.data) {
      setConfigData(response.data);
    }
  }

  function openLoginPopup() {
    setShowLoggedInPopup(true);
    setShowRegisterPopup(false);
  }

  function openRegisterPopup() {
    setShowLoggedInPopup(false);
    setShowRegisterPopup(true);
  }

  function closeModal() {
    setShowLoggedInPopup(false);
    setShowRegisterPopup(false);
  }

  async function getUserDataHandler() {
    const params = {
      operating_system: "IOS",
      apk_version: 1.4,
      language_code: "en",
      manufacture: "iPhone",
      device: 2,
      unique_no: "1759B753-E111-4731-B701-47FF45623B8F",
      model: "iPhone",
      package_name: "com.appyourservice.user",
      player_id: "fc72ca21-a128-4c86-9c71-b6046f30a122",
    };

    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

    try {
      const { response } = await getUserData(formData);
      if (response.status) {
        setUserData(response.data);
      }
    } catch (e) {}
  }

  // const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
  //   const url = `${geocodeJson}?key=AIzaSyAM4zhLnNffu6ll3P-3POGmOrhzi6i3xDI&latlng=${lat},${lng}`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((location) => {
  //       const place = location.results[0];
  //       const address = place.address_components.filter((item) => {
  //         if (item.types[0] === "administrative_area_level_2") {
  //           return item.long_name;
  //         }
  //       });
  //       const city = address?.[0]?.["long_name"];
  //       const fullAddress = place.formatted_address;
  //       localStorage.setItem(
  //         "currentLatLong",
  //         JSON.stringify({ lat, lng, fullAddress, city })
  //       );
  //       // setUserLocation({ lat, lng, fullAddress, city });
  //     });
  // };

  // //get current location latitude and longitude
  // const findMyLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       reverseGeocode(position.coords);
  //     });
  //   }
  // };

  return (
    <>
      {/* {firstRender.current && isLoggedIn && <FullPageLoader />} */}

      {isLoggedInPopup && (
        <LoginModal
          openRegisterPopup={openRegisterPopup}
          closeModal={closeModal}
        />
      )}

      {isRegisterPopup && (
        <RegisterModal
          openLoginPopup={openLoginPopup}
          closeModal={closeModal}
        />
      )}

      {/* {isForgotPasswordPopup && (
        <ForgotPasswordModal
          openLoginPopup={openLoginPopup}
          closeModal={closeModal}
        />
      )} */}
      <Head>
        <script
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAM4zhLnNffu6ll3P-3POGmOrhzi6i3xDI&libraries=places"
        ></script>
      </Head>
      <ToastContainer />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
