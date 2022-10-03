import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [games, setGames] = useState([]);
  const [backScrollWidth, setbackScrollWidth] = useState(0);
  const [frontScrollWidth, setFrontScrollWidth] = useState(0);

  const showCaseRef = useRef();
  const showCaseFrontRef = useRef();

  let navigate = useNavigate();

  function toGamePage(game) {
    navigate(game);
  }

  useEffect(() => {
    fetch(`/games`)
      .then((res) => res.json())
      .then(setGames);
  }, []);

  useEffect(() => {
    if (backScrollWidth === 0 && showCaseFrontRef.current && games.length > 0) {
      setFrontScrollWidth((games.length - 1) * 500);
      showCaseFrontRef.current.scrollLeft = (games.length - 1) * 500;
    }
  }, [games]);

  // scroll to left
  function scrollLeft() {
    console.log("left");
    if (backScrollWidth > 0) {
      const left = backScrollWidth - 500;
      showCaseRef.current.scrollLeft = `${left}`;
      setbackScrollWidth(left);
      const right = frontScrollWidth + 500;
      showCaseFrontRef.current.scrollLeft = `${right}`;
      setFrontScrollWidth(right);
    }
  }

  // scroll to right
  function scrollRight() {
    console.log("right");
    // showCaseRef.current.style.animate( { scrollLeft: '0' }, scrollDuration);
    if (backScrollWidth < showCaseRef.current.scrollWidth - 500) {
      const right = backScrollWidth + 500;
      showCaseRef.current.scrollLeft = `${right}`;
      showCaseFrontRef.current.scrollLeft = `${frontScrollWidth - right}`;
      setbackScrollWidth(right);
      const left = frontScrollWidth - 500;
      showCaseFrontRef.current.scrollLeft = `${left}`;
      setFrontScrollWidth(left);
    }
  }

  const showGames = games.map((game) => {
    return (
      <div key={game.id} className="game-poster">
        <img
          className="game-poster-img"
          src={game.image_url}
          alt={game.title}
          onClick={() => toGamePage(`/match-making/${game.id}`)}
        />
        {/* <div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div> */}
      </div>
    );
  });

  const showGamesFront = games
    .map((game) => {
      return (
        <div key={game.id} className="game-poster">
          <div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
        </div>
      );
    })
    .reverse();

  return (
    <div id="homepage">
      <div id="left-btn" onClick={scrollLeft}>
        &lt;
      </div>
      <div id="games-showcase-back" ref={showCaseRef}>
        {showGames}
      </div>
      <div id="games-showcase-front" ref={showCaseFrontRef}>
        {showGamesFront}
      </div>
      <div id="right-btn" onClick={scrollRight}>
        &gt;
      </div>
    </div>
  );
}

export default HomePage;
