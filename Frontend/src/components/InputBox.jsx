/* eslint-disable react/prop-types */

import "./components.css";

const InputBox = ({ label, name, type, placeholder, cref }) => {
  return (
    <div className="inputField">
      <div className="label">{label}</div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        ref={cref}
        className="inputBox"
      />
    </div>
  );
};

export default InputBox;
