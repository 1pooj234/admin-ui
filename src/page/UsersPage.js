import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import SearchBar from "../components/uiElements/SearchBar";
const FetchUsers = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [newUserList, setNewUserList] = useState(undefined);
  const updateUserList = (list) => {
    setNewUserList(list);
  };
  // const [query, setQuery] = useState("");

  // const queryHandler = (e) => {
  //   setQuery(e.target.value);
  // };
  // console.log(newUserList);
  // console.log(totalUsers);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const transformedData = [];
        for (let i in data) {
          transformedData.push({
            key: i,
            ...data[i],
            checked: false,
          });
        }
        if (newUserList === undefined) {
          setTotalUsers(transformedData);
        } else {
          setTotalUsers(newUserList);
        }
      } catch (e) {
        console.log(e);
      }
    };
    sendRequest();
  }, [newUserList]);
  return (
    <>
      <UsersList onUpdate={updateUserList} users={totalUsers} />
    </>
  );
};
export default FetchUsers;
