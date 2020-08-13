import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Flip, Flipper } from 'react-spring-flip';
import './styles.css';

const Square = ({ toggleFullScreen }: { toggleFullScreen: any }) => (
  <Flip flipId="square" className="square" onClick={toggleFullScreen}>
    <div style={{ padding: 4 }}>
      square
    </div>
  </Flip>
);

const FullScreenSquare = ({ toggleFullScreen }: { toggleFullScreen: any }) => (
  <Flip flipId="square" className="full-screen-square" onClick={toggleFullScreen}>
    <div style={{ padding: 4 }}>
      full-screen-square
    </div>
  </Flip>
);

const AnimatedSquare = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => setFullScreen(prevState => !prevState);

  return (
    <Flipper flipKey={fullScreen}>
      {fullScreen ? (
        <FullScreenSquare toggleFullScreen={toggleFullScreen} />
      ) : (
        <Square toggleFullScreen={toggleFullScreen} />
      )}
    </Flipper>
  );
};

ReactDOM.render(<AnimatedSquare />, document.querySelector('#root'));
