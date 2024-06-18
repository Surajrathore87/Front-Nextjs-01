import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import SkeletonLoader from "../../Utils/SkeletonLoader";
import TaxiActiveTab from "./Tabs/TaxiActiveTab";
import TaxiPastTab from "./Tabs/TaxiPastTab";
import {
  getTaxiBookingSummary,
  getTaxiHistory,
} from "../../../services/taxi_service_api";
import TaxiSummary from "./TaxiSummary";
import OverlayLoader from "../../Utils/OverlayLoader";

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

function TaxiHistory(props) {
  const { isLoggedIn } = props;
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [cancellationLoading, setCancellationLoading] = useState(false);
  const [bookingSummaryData, setBookingSummaryData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [bookingCancelled, setBookingCancelled] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/");
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (orderData) {
      setBookingId(orderData?.[0]?.booking_id);
    } else {
      setBookingId(null);
    }
  }, [orderData]);

  useEffect(() => {
    handleGetOrderHistory();
  }, [activeTab, bookingCancelled]);

  useEffect(() => {
    bookingId && handleGetBookingSummary(bookingId);
  }, [bookingId]);

  async function handleGetOrderHistory() {
    setTabLoading(true);
    const params = {
      request_type: activeTab,
      segment_id: 1,
    };
    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    const { response } = await getTaxiHistory(formData);
    setLoading(false);
    setTabLoading(false);

    if (response.status) {
      setOrderData(response.data.booking_data);
    } else {
      setOrderData(null);
      setBookingSummaryData(null);
    }
  }

  async function handleGetBookingSummary(bookingId) {
    setSummaryLoading(true);
    const params = {
      request_type: activeTab,
      segment_id: 1,
      booking_id: bookingId,
    };
    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    const { response } = await getTaxiBookingSummary(formData);
    setSummaryLoading(false);

    if (response.status) {
      setBookingSummaryData(response.data);
    } else {
      setBookingSummaryData(null);
    }
  }

  return (
    <>
      {cancellationLoading && <OverlayLoader />}
      <div className="container my-md-5">
        <div className="row">
          <div className="col-lg-8 py-2">
            <div className="my-order-tabbing py-2">
              <Tabs
                defaultActiveKey="ACTIVE"
                id="uncontrolled-tab-example"
                className="mb-3"
                onClick={(e) =>
                  setActiveTab(e.target.getAttribute("data-rr-ui-event-key"))
                }
              >
                <Tab eventKey="ACTIVE" title="ACTIVE">
                  {tabLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <TaxiActiveTab
                      bookingId={bookingId}
                      setBookingId={setBookingId}
                      orderData={orderData}
                      setBookingSummaryData={setBookingSummaryData}
                      setSummaryLoading={setSummaryLoading}
                    />
                  )}
                </Tab>
                <Tab eventKey="PAST" title="PAST">
                  {tabLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <TaxiPastTab
                      bookingId={bookingId}
                      setBookingId={setBookingId}
                      orderData={orderData}
                      setBookingSummaryData={setBookingSummaryData}
                      setSummaryLoading={setSummaryLoading}
                    />
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-lg-4 py-2">
            <div className="py-2">
              <button className="text-uppercase booking-summery font-sfpro fw-500 border-0 fs-20">
                BOOKING SUMMARY
              </button>
              {(summaryLoading || tabLoading) && <SkeletonLoader />}
              {!summaryLoading && !tabLoading && bookingSummaryData && (
                <TaxiSummary
                  bookingSummaryData={bookingSummaryData}
                  setCancellationLoading={setCancellationLoading}
                  summaryLoading={summaryLoading}
                  tabLoading={tabLoading}
                  setBookingCancelled={setBookingCancelled}
                />
              )}
              {!summaryLoading && !tabLoading && !bookingSummaryData && (
                <h2 className="text-center mt-4">No Summary</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxiHistory);
