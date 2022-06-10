import { useEffect, useContext } from "react";
import HttpHook from "../hook/httpHook";
import UserList from "../components/userfiles/UserList";
import { UserContext } from "../context/UserContext";
import Loading from "../components/uiElements/Loading";
const UserPage = () => {
  const userCtx = useContext(UserContext);
  const { users, addUsers } = userCtx;
  // const [usersData, setUsersData] = useState([]);
  const { sendRequest, status, err } = HttpHook();

  useEffect(() => {
    const transformUsersDataFunc = (usersList) => {
      const transfromedUserData = [];
      for (let key in usersList) {
        transfromedUserData.push({ id: key, ...usersList[key] });
      }
      addUsers(transfromedUserData);
    };
    sendRequest(
      {
        url: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      },
      transformUsersDataFunc
    );
  }, [sendRequest]);
  if (status) {
    return <Loading />;
  }
  if (err) {
    return (
      <div className="div-block">
        <p style={{ color: "red" }}>
          <b>Something went wrong</b>
        </p>
      </div>
    );
  }
  return (
    <>
      <UserList />
    </>
  );
};

export default UserPage;
