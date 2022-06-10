import "./App.css";
import UserPage from "./pages/UsersPage";
import UserProvider from "./context/UserContext";
import Navbar from "./components/navigaiton/Navbar";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar>
          <UserPage />
        </Navbar>
      </UserProvider>
    </div>
  );
}

export default App;
