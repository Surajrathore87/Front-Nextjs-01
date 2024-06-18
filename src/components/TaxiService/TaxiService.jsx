import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getTaxiServiceData } from "../../services/taxi_service_api";
import {
  setShowLoggedInPopup,
  setShowRegisterPopup,
} from "../../_redux/actions";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import Layout from "../../components/Layouts/Layout";

const LocationSelection = dynamic(import("../Utils/LocationSelection"));
const LocalTab = dynamic(() => import("./TaxiTabs/LocalTab"));
const RentalTab = dynamic(() => import("./TaxiTabs/RentalTab"));
const OutstationTab = dynamic(() => import("./TaxiTabs/OutstationTab"));
const Loader = dynamic(() => import("../Utils/Loader"));
const FullPageLoader = dynamic(() => import("../Utils/FullPageLoader"));

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  isLoggedInPopup: state.user.isLoggedInPopup,
});
const mapDispatchToProps = (dispatch) => ({
  setShowLoggedInPopup: (data) => {
    dispatch(setShowLoggedInPopup(data));
  },
  setShowRegisterPopup: (data) => {
    dispatch(setShowRegisterPopup(data));
  },
});

function TaxiService(props) {
  const { isLoggedIn, setShowLoggedInPopup } = props;
  const [isLoaded, setIsLoaded] = useState(true);
  const [serviceType, setServiceType] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [areaCode, setAreaCode] = useState(null);

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
    if (localStorage.getItem("taxi-booking")) {
      localStorage.removeItem("taxi-booking");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && pickupAddress) {
      handleGetTaxiData(pickupLocation?.lat, pickupLocation?.lng);
    } else if (!isLoggedIn && pickupAddress) {
      setShowLoggedInPopup(true);
    }
  }, [pickupAddress, isLoggedIn]);

  //taxi service data for pickup location
  async function handleGetTaxiData(lat, lng) {
    setIsLoaded(false);
    const params = {
      segment_id: 1,
      longitude: lng,
      latitude: lat,
      drop_location: "",
    };

    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    const { response } = await getTaxiServiceData(formData);
    if (response.status) {
      setServiceType(response.data.response_data.service_types);
      setAreaCode(response.data.response_data.id);
      setIsLoaded(true);
    } else {
      setServiceType(null);
      toastConfig["type"] = "error";
      toast(response.message, toastConfig);
      setIsLoaded(true);
    }
  }

  // service tabs available in taxi service data
  function renderServiceTabs() {
    if (isLoggedIn) {
      return serviceType?.map(
        (item, key) =>
          (item.serviceName == "Normal" && (
            <Tab eventKey="local" title="LOCAL" key={key}>
              <LocalTab
                serviceData={item}
                pickupLocation={pickupLocation}
                pickupAddress={pickupAddress}
                dropAddress={dropAddress}
                dropLocation={dropLocation}
                areaCode={areaCode}
              />
            </Tab>
          )) ||
          (item.serviceName == "Rental" && (
            <Tab eventKey="rental" title="RENTAL" key={key}>
              <RentalTab
                serviceData={item}
                pickupLocation={pickupLocation}
                pickupAddress={pickupAddress}
                dropAddress={dropAddress}
                dropLocation={dropLocation}
                areaCode={areaCode}
              />
            </Tab>
          )) ||
          (item.serviceName == "Outstation" && (
            <Tab eventKey="outstation" title="OUTSTATION" key={key}>
              <OutstationTab
                serviceData={item}
                pickupLocation={pickupLocation}
                pickupAddress={pickupAddress}
                dropAddress={dropAddress}
                dropLocation={dropLocation}
                areaCode={areaCode}
              />
            </Tab>
          ))
      );
    }
  }

  return (
    <>
      <>
        <Layout>
          <section className="taxi-banner w-100"></section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="taxi-tabs p-5 px-6 rounded">
                  <p className="fw-600 fs-30 text-center mb-5 pb-3">
                    Booking a car was never much easy, Just fill & select and
                    get a cab
                  </p>

                  {/* ----pickup and drop location inputs---- */}
                  <LocationSelection
                    setPickupLocation={setPickupLocation}
                    setPickupAddress={setPickupAddress}
                    setDropLocation={setDropLocation}
                    setDropAddress={setDropAddress}
                  />

                  {/* ----services tabs(local, rental, outstation etc)---- */}
                  {isLoaded && serviceType && (
                    <Tabs
                      defaultActiveKey="local"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      {renderServiceTabs()}
                    </Tabs>
                  )}
                  {!isLoaded && <Loader />}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxiService);
