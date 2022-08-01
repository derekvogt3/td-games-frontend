import "./Header.css"
import LoginForm from "./LoginForm";

function Header({loginFormPackage}) {
  return (
    <div id="header">
      <div>
        <h1 id="title">TD GAMES</h1>
      </div>
      <div>
        <LoginForm loginFormPackage={loginFormPackage} />
      </div>
    </div>
  );
}

export default Header;