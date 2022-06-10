import React from "react";
import "./Input.css";
const Input = React.forwardRef((props, ref) => {
  const inputElement =
    props.element === "check" ? (
      <div className="checkbox-container">
        <label className="select-all-label">{props.label}</label>
        <input
          onChange={props.change}
          checked={props.isChecked}
          id={props.id}
          type="checkbox"
        />
      </div>
    ) : (
      <div>
        <div className="input-container">
          <label>{props.label}</label>
          <input
            type={props.type}
            id={props.id}
            onChange={props.change}
            ref={ref}
          />
        </div>
        {props.valid && <p className="input-error-text">{props.errorText}</p>}
      </div>
    );
  return <>{inputElement}</>;
});

export default Input;
