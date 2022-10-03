import React, { useState } from "react";
import "./ProfPicForm.css";

export default function ProfPicForm({
  setShowProfPicButton,
  currentUser,
  setCurrentUser,
}) {
  const [picURL, setPicURL] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let obj = { photo_url: picURL };

    fetch("/update_prof_pic/" + currentUser.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowProfPicButton(true);
        setCurrentUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="profile-pic-form">
        <input
          type="text"
          value={picURL}
          placeholder="Enter Photo URL"
          onChange={(e) => setPicURL(e.target.value)}
          className="profile-pic-input"
        ></input>
        <input type="submit" value="Submit" className="button-68" />
        <button
          className="button-69"
          onClick={() => setShowProfPicButton(true)}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
