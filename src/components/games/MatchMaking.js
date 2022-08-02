import React from "react";
import "./MatchMaking.css";
import { useState } from "react";
import MatchInviteFriend from "./MatchInviteFriend";
import AllMatches from "./AllMatches";

export default function MatchMaking({ currentUser, gameId }) {
    

  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="matchmaking-container">
      <button
        className="button-49"
        role="button"
        onClick={() => setShowInvite(true)}
      >
        Invite Friend to Match
      </button>
      <AllMatches currentUser={currentUser} />

      {showInvite ? (
        <MatchInviteFriend
          currentUser={currentUser}
          gameIf={gameId}
          setShowInvite={setShowInvite}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
