import React from "react";
import FullPageLoader from "./FullPageLoader";

function Container(props) {
  const { isLoading, children } = props;
  return <>{isLoading ? <FullPageLoader /> : children}</>;
}

export default Container;
