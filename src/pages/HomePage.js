import Pixel from "../components/PixelArt";
import Header from "./header/Header";

function HomePage({loginFormPackage}) {
  return (
    <div>
      <Header loginFormPackage={loginFormPackage} />
      <Pixel></Pixel>
      <h2>test</h2>
    </div>
  );
}

export default HomePage;
