import { NavLink } from "react-router-dom";
import "./Header.css"
import LoginForm from "./LoginForm";

function Header({loginFormPackage}) {
  return (
    <div id="header">
      <div>
        <NavLink to="/">
          <h1 id="title">TD GAMES</h1>
        </NavLink>
      </div>
      <div>
        <LoginForm loginFormPackage={loginFormPackage} />
      </div>
    </div>
  );
}

export default Header;