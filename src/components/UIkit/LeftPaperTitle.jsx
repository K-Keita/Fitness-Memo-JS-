import React from "react";

const LeftPaperTitle = (props) => {
  return (
    <div>
      <span className="day-change" onClick={props.prevdays}>
        &lt;
      </span>
      {props.label}
      <span className="day-change" onClick={props.nextdays}>
        &gt;
      </span>
    </div>
  );
};

export default LeftPaperTitle;
