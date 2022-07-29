import "./App.css";
import UsersPage from "./page/UsersPage";
export default function App() {
  return (
    <div>
      <div className="nav_bar">
        <h2>Admin</h2>
        <p>check the checkbox to delete</p>
      </div>
      <UsersPage />
    </div>
  );
}
