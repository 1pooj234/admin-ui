import "./Button.css";
const Button = (props) => {
  return (
    <button
      disabled={props.isdisabled}
      onClick={props.click}
      className={props.className}
    >
      {props.image ? <img src={props.image} className="icon" /> : props.label}
    </button>
  );
};

export default Button;
