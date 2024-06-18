import React from "react";

function MobileAppSection() {
  return (
    <>
      <section className="mobile-app-section">
        <div className="container">
          <div className="row pt-5 ">
            <div className="col-6 d-none d-md-block">
              <img src="/images/mobile-app.png" className="img-fluid" />
            </div>
            <div className="col-md-6 pb-3 d-flex align-items-center text-md-end text-start">
              <div className="">
                <h1 className="fs-50 font-sfpro fw-600">
                  Book anything from your phone
                </h1>
                <p className="fs-20 label-color-3 font-sfpro fw-500 ">
                  You can easily and quickly book a vehicle with ur Apporio
                  All-in-One App
                  <br /> from Playstore. Just Select your branch and vehicle and
                  complete your <br /> bookings.
                </p>
                <div className="text-md-end text-center">
                  <img src="images/playstore.jpg" className="play-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default MobileAppSection;
