import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "../uiElements/Button";
import User from "./User";
import "./UserList.css";
import {
  getDataOnQuery,
  hasAnySelectedFunc,
} from "../../helperFunc/helperFuncs";
import Input from "../uiElements/Input";
import Paginate from "./pagination/Pageinate";
import Columns from "../uiElements/Columns";
import { UserContext } from "../../context/UserContext";

const UserList = (props) => {
  const userCtx = useContext(UserContext);
  const { users } = userCtx;
  const [query, setQuery] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const [newUserList, setNewUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    setNewUserList(users);
  }, [users]);

  const userSearchHandler = (event) => {
    const queryVal = event.target.value;
    setQuery(queryVal);
  };

  const filteredUserList = getDataOnQuery(newUserList, query);
  const selectAllHandler = () => {
    setSelectAllChecked((val) => !val);

    if (!selectAllChecked) {
      filteredUserList.forEach((user) => {
        for (let i = indexOfFirstUser; i < numberOfUsersPerPage; i++) {
          filteredUserList[i].selected = true;
        }
      });
    } else {
      filteredUserList.forEach((user) => {
        for (let i = indexOfFirstUser; i < numberOfUsersPerPage; i++) {
          filteredUserList[i].selected = false;
        }
      });
    }
  };

  const isCheckboxChecked = (index, checked) => {
    setNewUserList((usersList) => {
      return usersList.map((user, userIndex) => {
        if (userIndex === index) return { ...user, selected: checked };
        return user;
      });
    });
  };

  const deleteHandler = () => {
    setSelectAllChecked(false);
    const updatedUsersAfterDelete = newUserList.filter(
      (user) => user.selected !== true
    );
    setNewUserList(updatedUsersAfterDelete);
  };

  const deleteOneUser = (id) => {
    setNewUserList((usersList) => usersList.filter((user) => user.id !== id));
  };

  const updateUserHandler = (updatedUser) => {
    // userCtx.updateUserFunc(updatedUser);
    newUserList.unshift({
      ...updatedUser,
      selected: false,
    });
    const updatedUserList = newUserList.filter(
      (user, index, self) =>
        index === self.findIndex((obj) => obj.id === user.id)
    );
    setQuery("");
    setNewUserList(updatedUserList);
  };

  const indexOflastUser = usersPerPage * currentPage;
  const indexOfFirstUser = indexOflastUser - usersPerPage;
  const numberOfUsersPerPage =
    filteredUserList.slice(indexOfFirstUser, indexOflastUser).length !== 10
      ? filteredUserList.slice(indexOfFirstUser, indexOflastUser).length
      : indexOflastUser;

  const nextPages = (pageNum, nextPageNum = 0) => {
    setSelectAllChecked(false);
    const uncheckUsers = newUserList.map((user) => ({
      ...user,
      selected: false,
    }));

    setNewUserList(uncheckUsers);

    if (pageNum && nextPageNum === 0) {
      setCurrentPage(pageNum);
    } else {
      setCurrentPage(pageNum + nextPageNum);
    }
  };
  const displayUserList = filteredUserList
    .slice(indexOfFirstUser, indexOflastUser)
    .map((user, index) => {
      return (
        <User
          key={user.id}
          onChangeHandler={(e) => isCheckboxChecked(index, e.target.checked)}
          isChecked={user.selected}
          details={{
            name: user.name,
            email: user.email,
            role: user.role,
            id: user.id,
          }}
          onRemove={deleteOneUser.bind(null, user.id)}
          onEdit={updateUserHandler}
        />
      );
    });
  return (
    <>
      <div className="search-section">
        <label className="search-label">Search</label>
        <Input type="search" change={userSearchHandler} />
      </div>
      <div className="separation-block"></div>
      <div className="main-page">
        <div className="button-and-checkbox-container">
          <Input
            label="Select all"
            change={selectAllHandler}
            isChecked={selectAllChecked}
            element="check"
          />
          <Button
            className="delete-btn2"
            isDisabled={!hasAnySelectedFunc(newUserList)}
            click={deleteHandler}
          >
            Delete
          </Button>
        </div>
        <div className="table-headings">
          <div className="table-cell">
            <p>
              <b>Select</b>
            </p>
          </div>
          <Columns className="table-cell" />
          <div className="table-cell">
            <p>
              <b>Actions</b>
            </p>
          </div>
        </div>
        {filteredUserList.length === 0 ? (
          <div className="div-block">
            <p className="no-users-found-text">No Users found</p>
          </div>
        ) : (
          displayUserList
        )}
        <Paginate
          curPage={currentPage}
          totalUsers={filteredUserList.length}
          paginate={nextPages}
          noOfUsersPerPage={usersPerPage}
        />
      </div>
    </>
  );
};
export default UserList;
