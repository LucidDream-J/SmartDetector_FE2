import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-div">
      <Tilt
        className="Tilt"
        options={{ max: 50 }}
        style={{ height:70, width: 70}} >
        <div className=" Tilt-inner tilt-local"> <img src="./icons8-brain-64.png" alt=''></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
