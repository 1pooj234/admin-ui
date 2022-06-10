import "./Navbar.css";
const Navbar = (props) => {
  return (
    <section>
      <nav className="nav-bar">
        <h1>Admin UI</h1>
      </nav>
      {props.children}
    </section>
  );
};

export default Navbar;
