import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import shuffle from "lodash.shuffle";
import "./styles.css";

const ListShuffler = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const shuffleList = () => setData(shuffle(data));

  return (
    <Flipper flipKey={data.join("")}>
      <button onClick={shuffleList}> shuffle</button>
      <ul className="list">
        {data.map(d => (
          <Flipped key={d} flipId={d}>
            <li>{d}</li>
          </Flipped>
        ))}
      </ul>
    </Flipper>
  );
};

ReactDOM.render(<ListShuffler />, document.querySelector("#root"));
