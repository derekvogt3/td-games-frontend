import React from "react";
import "./AllMatches.css";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../utilities/GlobalVariables";
import Match from "./Match";

export default function AllMatches({ currentUser }) {
  const [allMatches, setAllMatches] = useState([]);
  useEffect(() => {
    fetch(`${fetchUrl}/all_matches/${currentUser.id}`)
      .then((res) => {
        return res.json();
      })
      .then(setAllMatches);
  }, []);

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
