import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import shuffle from 'lodash/shuffle';
import './styles.css';
import { Flip, Flipper } from 'react-spring-flip';

const ListShuffler = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const shuffleList = () => setData(shuffle(data));

  return (
    <Flipper flipKey={data.join('')}>
      <button onClick={shuffleList}> shuffle</button>
      <ul className="list">
        {data.map(d => (
          <Flip el="li" key={d} flipId={d}>
            {d}
          </Flip>
        ))}
      </ul>
    </Flipper>
  );
};

ReactDOM.render(<ListShuffler />, document.querySelector('#root'));
