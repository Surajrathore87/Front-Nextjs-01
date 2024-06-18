import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisV,
  faMapMarkerAlt,
  faShoppingCart,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  headerLogo,
  BabySittingMenuIcon,
  CarRepairMenuIcon,
  CarWashMenuIcon,
  cross,
  cross1,
  DeliveryMenuIcon,
  ElectricianMenuIcon,
  FoodMenuIcon,
  GroceryMenuIcon,
  LawyerMenuIcon,
  locator,
  MedicalMenuIcon,
  menu,
  PestControlMenuIcon,
  PlumberMenuIcon,
  RealEstateMenuIcon,
  SalonMenuIcon,
  SecurityGuardMenuIcon,
  TaxiMenuIcon,
  TowingMenuIcon,
  footerLogo,
} from "../../constants/imagesContains";
import { connect } from "react-redux";
import {
  setServiceSegments,
  setShowLoggedInPopup,
  setShowRegisterPopup,
  setUserLocation,
  userLoggedIn,
} from "../../_redux/actions";
import Cookies from "js-cookie";
import { Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServiceSegmentsData } from "../../services/user";

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userLocation: state.user.userLocation,
  serviceSegments: state.user.serviceSegments,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLoggedIn: (data) => {
    dispatch(userLoggedIn(data));
  },
  setShowLoggedInPopup: (data) => {
    dispatch(setShowLoggedInPopup(data));
  },
  setShowRegisterPopup: (data) => {
    dispatch(setShowRegisterPopup(data));
  },
  setUserLocation: (data) => {
    dispatch(setUserLocation(data));
  },
  setServiceSegments: (data) => {
    dispatch(setServiceSegments(data));
  },
});
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function Header(props) {
  const {
    userLocation,
    setUserLocation,
    setShowRegisterPopup,
    setShowLoggedInPopup,
    isLoggedIn,
    setUserLoggedIn,
    setServiceSegments,
  } = props;

  const [showLocationbar, setShowLocationbar] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const searchInput = useRef(null);
  const router = useRouter();

  const handleShowMenu = () => setShowMenu(!showMenu);

  function logout() {
    Cookies.remove("_access_token");
    setUserLoggedIn(false);
  }

  useEffect(() => {
    if (localStorage.getItem("currentLatLong")) {
      const currentLatLong = JSON.parse(localStorage.getItem("currentLatLong"));
      setCurrentLocation(currentLatLong);
      setUserLocation(currentLatLong);
      isLoggedIn && handleGetServiceSegments(currentLatLong);
    }
  }, []);

  //get address using geocode api
  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=AIzaSyAM4zhLnNffu6ll3P-3POGmOrhzi6i3xDI&latlng=${lat},${lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const address = place.address_components.filter((item) => {
          if (item.types[0] === "administrative_area_level_2") {
            return item.long_name;
          }
        });
        const city = address?.[0]?.["long_name"];
        const fullAddress = place.formatted_address;
        searchInput.current.value = city;
        localStorage.setItem(
          "currentLatLong",
          JSON.stringify({ lat, lng, fullAddress, city })
        );
        // setUserLocation({ lat, lng, fullAddress, city });
        // setLocationObj({ lat, lng, fullAddress, city });
        setCurrentLocation({ lat, lng, fullAddress, city });
        // localStorage.setItem("currentLocation", city);
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
    // autocomplete.setTypes(["(cities)"]);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const address = place.address_components.filter((item) => {
        if (item.types[0] === "administrative_area_level_2") {
          return item.long_name;
        }
      });
      const city = address?.[0]?.["long_name"];
      const fullAddress = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      localStorage.setItem(
        "currentLatLong",
        JSON.stringify({ lat, lng, fullAddress, city })
      );
      // setUserLocation({ lat, lng, fullAddress, city });
      // setLocationObj({ lat, lng, fullAddress, city });
      setCurrentLocation({ lat, lng, fullAddress, city });
      // setShowLocationbar(false);
    });
  }

  useEffect(() => {
    if (currentLocation.fullAddress) {
      setUserLocation(currentLocation);
    }
  }, [currentLocation.fullAddress]);

  async function handleGetServiceSegments(location) {
    const params = {
      latitude: location.lat,
      longitude: location.lng,
    };

    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

    const { response } = await getServiceSegmentsData(formData);

    if (response.status) {
      const segments = response.data.find(
        (item) => item.cell_title === "ALL SERVICES"
      ).cell_contents;
      setServiceSegments(segments);
    }
  }

  return (
    <>
      <div className="container">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="white"
          variant="dark"
          className="py-0 align-items-center apporio-navbar"
        >
          <Navbar.Brand className="text-dark navbar-inner ps-lg-0 ps-2 ">
            <Link href="/">
              <a className="ms-lg-5 py-0">
                <img
                  src={footerLogo}
                  alt=""
                  title="Apporio Infolabs"
                  width={160}
                />
              </a>
            </Link>
          </Navbar.Brand>
          {/* collapse Menu */}

          {/*  */}
          <div className="w-100 mobile-menu-navbar">
            <div className="w-max-content py-2 ps-2 d-flex align-items-center">
              <img src={headerLogo} width={100} />
            </div>
            <div className="col d-flex align-items-center justify-content-end text-end">
              {/* location */}
              <div className="pe-3">
                <a
                  className="nav-item fs-15 fw-600 text-nowarp active-link cursor-pointer text-decoration-none text-dark"
                  onClick={() => setShowLocationbar(!showLocationbar)}
                >
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faMapMarkerAlt}
                    width={18}
                    height={18}
                  />{" "}
                  {userLocation?.city || "Choose Location"}
                </a>
              </div>
              {/* cart */}
              <div className="pe-3 mobile-user-menu">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="border-0 py-0 bg-transparent"
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="text-dark fs-20"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {!isLoggedIn && (
                      <>
                        <Dropdown.Item
                          onClick={() => setShowLoggedInPopup(true)}
                        >
                          Login
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setShowRegisterPopup(true)}
                        >
                          Sign Up
                        </Dropdown.Item>
                      </>
                    )}
                    {isLoggedIn && (
                      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    )}
                    {/* <Dropdown.Item>My Account</Dropdown.Item>
                    <Dropdown.Item>Terms of Use</Dropdown.Item>
                    <Dropdown.Item>Privacy Pollicy</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <Navbar className="navbar-inner w-100" id="responsive-navbar-nav">
            <Nav className="me-auto">{/*  */}</Nav>
            <Nav className="d-flex align-items-center">
              <Nav.Link>
                <a
                  className="nav-item fs-23 fw-600 active-link cursor-pointer text-decoration-none text-dark"
                  onClick={() => setShowLocationbar(!showLocationbar)}
                >
                  <FontAwesomeIcon
                    className="me-2"
                    icon={faMapMarkerAlt}
                    width={18}
                    height={18}
                  />{" "}
                  {userLocation?.city || "Choose Location"}
                </a>
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link>
                  <Link href="/my-order">
                    <a className="nav-item text-decoration-none text-dark fs-23 fw-600">
                      My Order
                    </a>
                  </Link>
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link>
                  <div className="nav-item">
                    <button
                      className="fs-23 text-white fw-500 ms-3 px-3 pb-1 me-0 login-sign-up btn-login rounded"
                      title="logout"
                      onClick={logout}
                    >
                      <FontAwesomeIcon
                        icon={faSignInAlt}
                        width={18}
                        height={18}
                        className="fs-18"
                      />{" "}
                      Logout
                    </button>
                  </div>
                </Nav.Link>
              )}

              {!isLoggedIn && (
                <>
                  <Nav.Link eventKey={2}>
                    <div className="d-flex">
                      <div className="nav-item d-flex align-items-center">
                        <button
                          className="fs-23 text-white fw-500 px-3 pb-1 login-sign-up rounded"
                          title="Sign Up"
                          onClick={() => setShowRegisterPopup(true)}
                        >
                          <FontAwesomeIcon
                            icon={faSignInAlt}
                            width={18}
                            height={18}
                            className="fs-18"
                          />{" "}
                          Sign Up
                        </button>
                      </div>
                      <div className="nav-item d-flex align-items-center">
                        <button
                          className="fs-23 text-white fw-500 ms-3 px-3 pb-1 me-0 login-sign-up btn-login rounded"
                          title="Login"
                          onClick={() => setShowLoggedInPopup(true)}
                        >
                          <FontAwesomeIcon
                            icon={faSignInAlt}
                            width={18}
                            height={18}
                            className="fs-18"
                          />{" "}
                          Login
                        </button>
                      </div>
                    </div>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar>
        </Navbar>
      </div>

      {showLocationbar && (
        <section className="header-location px-5 font-sfpro">
          <div className="p-4 container">
            <h4 className="label-color-2 mb-3 fw-600">Your Current Location</h4>
            <div className="position-relative">
              <Form.Control
                ref={searchInput}
                name="searchLocation"
                className="location-header-input shadow-none pe-4"
                placeholder="Type your location"
                onChange={autoCompleteAddress}
              />
              <div className="position-absolute top-0 end-0 mt-4 me-3 cursor-pointer">
                <img
                  src={locator}
                  alt=""
                  width={25}
                  className="locator"
                  onClick={findMyLocation}
                />
              </div>
            </div>
            <div className=" mt-4 d-flex align-items-center gap-5">
              <img
                src={cross1}
                alt=""
                width={25}
                className="cursor-pointer ms-auto"
                onClick={() => setShowLocationbar(false)}
              />
            </div>
          </div>
        </section>
      )}
      {showMenuBar && (
        <section className="header-menu-bar bg-white px-5 font-sfpro">
          <div className="p-5 container py-4">
            <div className="row text-uppercase fs-23 fw-500 label-color-2 font-sfpro">
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="/taxi-service">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={TaxiMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Taxi
                  </a>
                </Link>
              </div>
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={SalonMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Salon
                  </a>
                </Link>
              </div> */}
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={LawyerMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Lawyer
                  </a>
                </Link>
              </div> */}
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={CarRepairMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Car Repair
                  </a>
                </Link>
              </div> */}
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="/grocery-service">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={GroceryMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Grocery
                  </a>
                </Link>
              </div>
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={PlumberMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Plumber
                </a>
              </div> */}
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={BabySittingMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Baby Sitting
                </a>
              </div> */}
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={SecurityGuardMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Security Guard
                </a>
              </div> */}
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="/food-service">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={FoodMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Food
                  </a>
                </Link>
              </div>
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={ElectricianMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Electrician
                </a>
              </div>
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={TowingMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Towing
                </a>
              </div>
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={PestControlMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Pest Control
                </a>
              </div> */}
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <Link href="/delivery-service">
                  <a className="text-decoration-none label-color-2">
                    <img
                      src={DeliveryMenuIcon}
                      className="me-3"
                      width={35}
                      height={35}
                    />
                    Delivery
                  </a>
                </Link>
              </div>
              {/* <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={RealEstateMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Real Estate
                </a>
              </div>
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={MedicalMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Madical
                </a>
              </div>
              <div className="col-lg-3 d-flex align-items-center pb-3">
                <a href="" className="text-decoration-none label-color-2">
                  <img
                    src={CarWashMenuIcon}
                    className="me-3"
                    width={35}
                    height={35}
                  />
                  Car Wash
                </a>
              </div> */}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
