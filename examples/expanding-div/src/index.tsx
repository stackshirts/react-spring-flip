import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Flip, Flipper } from 'react-spring-flip';
import './styles.css';

const AnimatedSquare = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => setFullScreen(prevState => !prevState);

  return (
    <Flipper flipKey={fullScreen}>
      <Flip
        flipId="square"
        className={fullScreen ? 'full-screen-square' : 'square'}
        onClick={toggleFullScreen}
      />
    </Flipper>
  );
};

ReactDOM.render(<AnimatedSquare />, document.querySelector('#root'));
