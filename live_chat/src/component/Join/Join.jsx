import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import logo from "../../images/logo.png";

let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
}
const Join = () => {
 
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Live Chat</h1>
        <input
          type="text"
          id="joinInput"
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <Link to="/chat" onClick={(e) => (!user ? e.preventDefault() : null)}>
          <button onClick={sendUser} className="joinBtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };



