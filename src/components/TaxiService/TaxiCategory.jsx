import { Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const CabSelection = dynamic(import("./fields/CabSelection"));

function TaxiCategory(props) {
  const { taxiCategory, setVehicleId, vehicleId } = props;
  const [activeTab, setActiveTab] = useState("economy");

  return (
    <>
      <div className=" mb-3  ">
        <h6 className="fs-26 fw-600 mb-3 px-2 px-lg-0 px-md-1 taxi-heading label-color-1">
          Choose Cab
        </h6>

        <div className="cab-type ms-2 mb-4 font-sfpro">
          <Tabs
            defaultActiveKey="economy"
            id="category-tabs"
            className="mb-3 ride-tabbing"
            onClick={(e) =>
              setActiveTab(e.target.getAttribute("data-rr-ui-event-key"))
            }
          >
            {taxiCategory.map(
              (item, key) =>
                (item.name === "Economy" && (
                  <Tab eventKey="economy" title="ECONOMY" key={key}>
                    {activeTab == "economy" && (
                      <CabSelection
                        vehicles={item.vehicle}
                        setVehicleId={setVehicleId}
                      />
                    )}
                  </Tab>
                )) ||
                (item.name === "Premier" && (
                  <Tab eventKey="premier" title="PREMIER" key={key}>
                    {activeTab == "premier" && (
                      <CabSelection
                        vehicles={item.vehicle}
                        setVehicleId={setVehicleId}
                      />
                    )}
                  </Tab>
                )) ||
                (item.name === "Luxury" && (
                  <Tab eventKey="luxury" title="LUXURY" key={key}>
                    {activeTab == "luxury" && (
                      <CabSelection
                        vehicles={item.vehicle}
                        setVehicleId={setVehicleId}
                      />
                    )}
                  </Tab>
                ))
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default TaxiCategory;
