import React from "react";

import Spinner from "../spinner/spinner";

const WithSpinner = (WrappedComponent) => {
  return ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  };
};

export default WithSpinner;
