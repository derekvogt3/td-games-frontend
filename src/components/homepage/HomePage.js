import { NavLink, useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import "./HomePage.css";
import Pixel from "../../utilities/PixelArt";

function HomePage() {

  let navigate = useNavigate()

  function toGamePage(game) {
    navigate(game)
  }

  return (
    <div id="homepage">
      <div id="games-showcase">
        <Carousel>
          <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://m.media-amazon.com/images/I/61kjGo7vPtL._AC_SX679_.jpg"
                alt="Tic Tac Toe"
                onClick={() => toGamePage("/tictactoe")}
              />
              
            <Carousel.Caption>
              <h3>Tic Tac Toe</h3>
              <p>O X O X O</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.ultraboardgames.com/connect4/gfx/banner2.jpg"
              alt="Collect 4"
            />

            <Carousel.Caption>
              <h3>Collect 4!</h3>
              <p>Coming soon!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://playpager.com/wp-content/uploads/2019/08/reversi-game.jpg"
              alt="Reversi"
            />

            <Carousel.Caption>
              <h3>Reversi</h3>
              <p>Coming soon!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
