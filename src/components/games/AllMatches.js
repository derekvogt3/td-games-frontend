import React from "react";
import "./AllMatches.css";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../utilities/GlobalVariables";
import Match from "./Match";

export default function AllMatches({ currentUser, gameId }) {
  const [allMatches, setAllMatches] = useState([]);
  useEffect(() => {
    getMatches();
    const intervalId = setInterval(() => {
      getMatches();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getMatches() {
    fetch(`${fetchUrl}/all_matches?user_id=${currentUser.id}&game_id=${gameId}`)
      .then((res) => {
        return res.json();
      })
      .then(setAllMatches);
  }

  const MatchesToInclude = allMatches.map((obj) => {
    return (
      <Match
        key={obj.usermatch.id}
        usermatch={obj.usermatch}
        friend={obj.friend}
        currentUser={currentUser}
      />
    );
  });

  return (
    <div id="match-list">
      {" "}
      <div className="list-header">
        <p>All Matches</p>
      </div>
      {MatchesToInclude}
    </div>
  );
}
