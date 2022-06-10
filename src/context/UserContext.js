import React, { useReducer } from "react";
export const UserContext = React.createContext({
  users: [],
  addUsers(users) {},
});

const initialState = {
  users: [],
};

const userReducer = (state, action) => {
  if (action.type === "ADD") {
    const usersList = action.users;
    const newUsersList = usersList.map((user) => ({
      ...user,
      selected: false,
    }));
    return {
      users: newUsersList,
    };
  }

  return initialState;
};

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const addUsersHandler = (users) => {
    dispatch({ type: "ADD", users });
  };

  const userValues = {
    users: userState.users,
    addUsers: addUsersHandler,
  };
  return (
    <UserContext.Provider value={userValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
