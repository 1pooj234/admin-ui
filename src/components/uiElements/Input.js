import "./Input.css";
const Input = (props) => {
  return (
    <div className="checkbox-container">
      <label className="select-all-label">{props.label}</label>
      <input
        onChange={props.change}
        checked={props.isChecked}
        id={props.id}
        type="checkbox"
      />
    </div>
  );
};

export default Input;
