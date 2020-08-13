import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Flipper, Flipped } from "react-flip-toolkit";
import "./styles.css";

const AnimatedSquare = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => setFullScreen(prevState => !prevState);

  return (
    <Flipper flipKey={fullScreen}>
      <Flipped flipId="square">
        <div
          className={fullScreen ? "full-screen-square" : "square"}
          onClick={toggleFullScreen}
        />
      </Flipped>
    </Flipper>
  );
};

ReactDOM.render(<AnimatedSquare />, document.querySelector("#root"));
