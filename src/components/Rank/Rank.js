import React from "react";
import "./Rank.css";

const Rank = ({name, entries}) => {
  return (
    <div>
    <br></br>
    <div className='white f3'>
      {`${name} your entry count is ...  `}
      </div>
      <div className='white f1'>
        {entries}
      </div>
      <br></br>
    </div>
  );
};

export default Rank;
