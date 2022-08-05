import React from "react";
import "./MatchMaking.css";
import { useState, useEffect } from "react";
import MatchInviteFriend from "./MatchInviteFriend";
import AllMatches from "./AllMatches";
import { useLocation } from "react-router-dom";
import { fetchUrl } from "../../utilities/GlobalVariables";

export default function MatchMaking({ matchMakingPackage }) {
  const {currentUser} = matchMakingPackage
  let location = useLocation();

  const gameId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const [showInvite, setShowInvite] = useState(false);
  const [game, setGame] = useState({});

  useEffect(() => {
    fetch(fetchUrl + "/games/" + gameId)
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, []);

  return (
    <div className="matchmaking-container">
      <AllMatches currentUser={currentUser} gameId={gameId} />
      <div className="friend-invite-container">
        <button
          className="button-49"
          role="button"
          onClick={() => {
            if (gameId == "1") {
              setShowInvite(true)
            }
          }
          }
        >
          {gameId == 1 ? "Invite Friend to Match" : "Coming Soon!"}
        </button>

        {showInvite ? (
          <MatchInviteFriend
            currentUser={currentUser}
            gameId={gameId}
            setShowInvite={setShowInvite}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="game-container">
        <h1>{game.title}</h1>
        <img className="game-match-img" src={game.image_url} />
      </div>
    </div>
  );
}
