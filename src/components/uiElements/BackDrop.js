import "./BackDrop.css";
const BackDrop = (props) => {
  return <div onClick={props.click} className="backdrop"></div>;
};

export default BackDrop;
