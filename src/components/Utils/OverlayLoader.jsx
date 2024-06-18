import React from "react";

function OverlayLoader() {
  return (
    <>
      <section className="apporio-overlay-loader position-fixed w-100 h-100 top-0 d-flex justify-content-center align-items-center">
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    </>
  );
}

export default OverlayLoader;
