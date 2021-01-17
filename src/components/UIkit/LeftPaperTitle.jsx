import React from "react";
import styles from '../../styles/UIkit/ListTitle.module.scss';

const LeftPaperTitle = (props) => {
  return (
    <div>
      <span className={styles.b_change} onClick={props.prevDays}>
        &lt;
      </span>
      {props.label}
      <span className={styles.b_change} onClick={props.nextDays}>
        &gt;
      </span>
    </div>
  );
};

export default LeftPaperTitle;
