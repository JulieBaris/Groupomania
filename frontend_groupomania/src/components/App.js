// import utils
import '../styles/index.scss'
import { Outlet, Link } from "react-router-dom";


export default function App() {
  return (
    <div>
      <h1>Groupomania</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">SignUp</Link>
      </nav>
      <Outlet />
    </div>
  );
}