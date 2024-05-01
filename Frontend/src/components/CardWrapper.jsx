/* eslint-disable react/prop-types */

import "./components.css";

const CardWrapper = ({ children, value }) => {
  return (
    <div className="Card">
      <div className="form-head">
        <h1 className="form-title">{value}</h1>
        <h2 className="form-subtitle">
          Enter your credentials to access your account
        </h2>
      </div>
      {children}
    </div>
  );
};

export default CardWrapper;
