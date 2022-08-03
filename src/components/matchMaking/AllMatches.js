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
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getMatches() {
    fetch(`${fetchUrl}/all_matches?user_id=${currentUser.id}&game_id=${gameId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let obj = { pending: 1, "in match": 2, finished: 3, rejected: 4 };
        data.sort(function (a, b) {
          if (obj[a.usermatch.status] < obj[b.usermatch.status]) {
            return -1;
          }

          if (obj[a.usermatch.status] < obj[b.usermatch.status]) {
            return 1;
          }

          return 0;
        });

        setAllMatches(data);
      });
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
