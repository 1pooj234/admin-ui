import { useState, useRef, useContext } from "react";
import "./User.css";
import Input from "../uiElements/Input";
import Button from "../uiElements/Button";
import {
  isEmailValid,
  isNameValid,
  isRoleValid,
} from "../../helperFunc/ValidatorFunc";
import Columns from "../uiElements/Columns";
import { UserContext } from "../../context/UserContext";
const User = (props) => {
  const userCtx = useContext(UserContext);
  const { email, name, id, role } = props.details;
  const [showEditFrom, setEditForm] = useState(false);
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    role: true,
    email: true,
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();

  const editFormHandler = () => {
    setEditForm((val) => !val);
    setFormIsValid({
      name: true,
      role: true,
      email: true,
    });
  };

  const submitHandler = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const role = roleRef.current.value;
    const emailIsValid = isEmailValid(email);
    const nameIsValid = isNameValid(name);
    const roleIsValid = isRoleValid(role);
    setFormIsValid({
      name: nameIsValid,
      email: emailIsValid,
      role: roleIsValid,
    });
    const isValid = nameIsValid && emailIsValid && roleIsValid;

    if (isValid) {
      props.onEdit({
        id,
        name,
        email,
        role,
      });
      setEditForm(false);
    }
  };

  return (
    <div className="table">
      <div className="grid-item">
        <Input
          element="check"
          isChecked={props.isChecked}
          change={props.onChangeHandler}
          id={id}
        />
      </div>
      <Columns
        type="child"
        className="column-entries"
        name={name}
        email={email}
        role={role}
      />
      <div>
        <Button className="delete-btn" click={props.onRemove}>
          <img
            className="icon"
            alt="delete icon"
            src="https://static.thenounproject.com/png/2747965-200.png"
          />
        </Button>
        <Button className="edit-btn" click={editFormHandler}>
          <img
            className="icon"
            alt="edit icon"
            src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
          />
        </Button>
      </div>
      {showEditFrom && (
        <div className="edit-form">
          <Input
            label="Name"
            errorText={"name should have atleast" + "\n" + "5 characters"}
            valid={!formIsValid.name}
            type="text"
            ref={nameRef}
            element="text"
          />

          <Input
            label="Email"
            errorText="enter valid email"
            valid={!formIsValid.email}
            type="text"
            ref={emailRef}
            element="email"
          />

          <Input
            label="Role"
            errorText="enter either admin or member"
            valid={!formIsValid.role}
            type="text"
            ref={roleRef}
            element="text"
          />
          <Button className="submit_btn" click={submitHandler}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default User;
