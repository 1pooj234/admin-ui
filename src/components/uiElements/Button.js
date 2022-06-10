import "./Button.css";
const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.click}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
