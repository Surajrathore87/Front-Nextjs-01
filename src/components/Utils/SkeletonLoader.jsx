import React from "react";

function SkeletonLoader() {
  return (
    <>
      <div className="page-content">
        <div className="placeholder-content">
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
        </div>
      </div>
    </>
  );
}
export default SkeletonLoader;
