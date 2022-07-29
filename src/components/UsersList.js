import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import Input from "./uiElements/Input";
import Button from "./uiElements/Button";
import BackDrop from "./uiElements/BackDrop";
import SearchBar from "./uiElements/SearchBar";
import "./UsersList.css";
import {
  validateEmail,
  validateName,
  validateRole,
} from "../validate/Validator";
const delSingleUser = (list1, list2, id) => {
  let myArray = [...list1];
  let toRemove = [...list2].filter((el) => el.checked === true && id === el.id);
  myArray = myArray.filter((ar) => !toRemove.find((rm) => rm.id === ar.id));
  return myArray;
};
const update = (list1, list2) => {
  let myArray = [...list1];

  let toRemove = [...list2].filter((el) => el.checked === true);
  myArray = myArray.filter((ar) => !toRemove.find((rm) => rm.id === ar.id));
  return myArray;
};

const UserList = (props) => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const roleRef = useRef("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [usersPerPage] = useState(10);
  const [curPage, setCurPage] = useState(1);
  const [usersOfPage, setUsersOfPage] = useState([]);
  const [valid, setValid] = useState({
    name: true,
    email: true,
    role: true,
  });

  const [query, setQuery] = useState("");

  const lastUser = usersPerPage * curPage;
  const firstUser = lastUser - usersPerPage;
  let slide = "form";
  if (show) {
    slide = "form form_slide";
  }

  const queryHandler = (e) => {
    setQuery(e.target.value);
    setSelectAll(false);
  };

  useEffect(() => {
    const filteredUsers = props.users.filter((user) => {
      if (user.name.toLowerCase().includes(query)) {
        return user;
      } else if (user.email.toLowerCase().includes(query)) {
        return user;
      } else if (user.role.toLowerCase().includes(query)) {
        return user;
      }
      return 0;
    });
    const finalUsersList = query !== "" ? filteredUsers : props.users;
    setUsersOfPage(finalUsersList.slice(firstUser, lastUser));
  }, [firstUser, lastUser, props, query]);

  const selectAllHandler = (checked) => {
    setSelectAll(checked);
    let selectedList = [...usersOfPage];
    if (checked) {
      selectedList = selectedList.map((u) => ({ ...u, checked: true }));
    } else {
      selectedList = selectedList.map((u) => ({ ...u, checked: false }));
    }
    setUsersOfPage(selectedList);
  };
  const setChecked = (checked, index) => {
    setUsersOfPage((uList) => {
      return uList.map((user, userIndex) => {
        if (index === userIndex) {
          return { ...user, checked };
        }
        return user;
      });
    });
  };

  const onDelete = (id) => {
    setSelectAll(false);
    const allUsers = [...props.users];
    const updatedList = delSingleUser(allUsers, usersOfPage, id);

    props.onUpdate(updatedList);
  };

  const paginate = (pageNo) => {
    setSelectAll(false);
    setCurPage(pageNo);
  };

  const deleteAllHandler = () => {
    setSelectAll(false);
    const allUsers = [...props.users];
    const updatedList = update(allUsers, usersOfPage);
    props.onUpdate(updatedList);
  };

  const showForm = (id) => {
    setId(id);
    console.log(id);
    setShow((prev) => !prev);
  };

  const closeForm = () => {
    setShow(false);
    setId("");
  };

  const onEdit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const role = roleRef.current.value;
    const validName = validateName(name);
    const validEmail = validateEmail(email);
    const validRole = validateRole(role);
    const allUsers = [...props.users];
    const findUserIndex = allUsers.findIndex((user) => user.id === id);
    const findUser = allUsers.find((user) => user.id === id);
    allUsers[findUserIndex] = {
      name: name ? name : findUser.name,
      email: email ? email : findUser.email,
      role: role ? role : findUser.role,
      id: id,
    };
    setValid({
      name: validName,
      email: validEmail,
      role: validRole,
    });
    const isValid = validName || validEmail || validRole;
    if (isValid) {
      props.onUpdate(allUsers);
    }
    if (isValid) {
      setId("");
      setShow(false);
      setValid({
        name: true,
        email: true,
        role: true,
      });
    }
    emailRef.current.value = "";
    nameRef.current.value = "";
    roleRef.current.value = "";
  };
  console.log(valid);
  const user = usersOfPage.map((u, index) => (
    <div className="grid" key={u.id}>
      <span>
        <Input
          type="checkbox"
          change={(e) => setChecked(e.target.checked, index)}
          isChecked={u.checked}
        ></Input>
      </span>
      <span>{u.name}</span>
      <span>{u.email}</span>
      <span>{u.role}</span>
      <span className="action_class">
        <Button
          className="img_btn del"
          image="https://static.thenounproject.com/png/2747965-200.png"
          isdisabled={!u.checked}
          click={onDelete.bind(null, u.id)}
        ></Button>
        <Button
          className="img_btn edit"
          click={showForm.bind(null, u.id)}
          image="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
        ></Button>
      </span>
      <div className="mobile_actions">
        <Button
          className="img_btn_small del"
          image="https://static.thenounproject.com/png/2747965-200.png"
          isdisabled={!u.checked}
          click={onDelete.bind(null, u.id)}
        ></Button>
        <Button
          className="img_btn_small edit"
          click={showForm.bind(null, u.id)}
          image="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
        ></Button>
      </div>
      <div className="member_section">
        <p>Role:</p>
        <b>{u.role}</b>
      </div>
    </div>
  ));

  return (
    <div className="users_section">
      <SearchBar change={queryHandler} />
      {show && <BackDrop click={closeForm} />}
      <form className={slide} onSubmit={onEdit}>
        <input type="text" placeholder="name" ref={nameRef} />
        {!valid.name && (
          <p className="error_text">Name length should be greater than 5</p>
        )}
        <input type="text" placeholder="email" ref={emailRef} />
        {!valid.email && <p className="error_text">Enter a valild Email</p>}
        <input type="text" placeholder="role" ref={roleRef} />
        {!valid.role && (
          <p className="error_text">Role can only be member or admin</p>
        )}
        <Button label="Send" className="form_btn">
          send
        </Button>
      </form>
      <div className="page_action">
        <div>
          <b className="select_all_text">Select All</b>
          <Input
            type="checkbox"
            change={(e) => selectAllHandler(e.target.checked)}
            isChecked={selectAll}
          />
        </div>
        <Button
          label={"Delete all"}
          click={deleteAllHandler}
          className="btn_del"
        ></Button>
      </div>
      <div className="only_users">
        <div className="grid heading">
          <span></span>
          <span>
            <strong>Name</strong>
          </span>
          <span>
            <strong>email</strong>
          </span>
          <span>
            <strong>role</strong>
          </span>
          <span className="actions">
            <strong>actions</strong>
          </span>
        </div>
        <div className="users">
          {props.users.length === 0 ? <p>No Users Found</p> : user}
        </div>
      </div>

      <Pagination
        curPage={curPage}
        totalUsers={props.users.length}
        usersPerPage={usersPerPage}
        paginate={paginate}
      />
    </div>
  );
};
export default UserList;
