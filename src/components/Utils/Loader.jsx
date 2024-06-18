import React from "react";

function Loader() {
  return (
    <>
      <section className="apporio-loader w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    </>
  );
}

export default Loader;
