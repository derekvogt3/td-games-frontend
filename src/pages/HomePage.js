import Pixel from "../components/PixelArt";
import LoginForm from "./LoginForm";

function HomePage({users, usersList, currentUser, setCurrentUser}) {
  return (
    <div>
      <h1>home page</h1>
      <LoginForm users={users} usersList={usersList} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Pixel></Pixel>
      <h2>test</h2>
    </div>
  );
}

export default HomePage;
