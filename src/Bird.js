import React, { useEffect, useState } from 'react';

const Bird = () => {
  const birdSize = 20;
  const pipeWidth = 50;
  const gameHeight = 500;
  const gravity = 3;
  const jump = 65;
  const pipeGap = 100;
  const [birdPosition, setBirdPosition] = useState(100);
  const [startGame, setStartGame] = useState(false);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeLeft, setPipeLeft] = useState(1000 - pipeWidth);
  const bottomPipeHeight = gameHeight - pipeGap - pipeHeight;

  useEffect(() => {
    let timeGravity;
    if (startGame && birdPosition < gameHeight - birdSize) {
      timeGravity = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + gravity);
      }, 20);
    }
    return () => {
      clearInterval(timeGravity);
    };
  }, [startGame, birdPosition]);
  const handleClick = () => {
    if (startGame) {
      let newBirdPosition = birdPosition - jump;

      if (newBirdPosition < 0) {
        newBirdPosition = 0;
      }
      setBirdPosition(newBirdPosition);
    }
  };

  useEffect(() => {
    if (startGame && pipeLeft >= -60) {
      let pipeMove = setInterval(() => {
        setPipeLeft((pipeLeft) => pipeLeft - 4);
      }, 20);
      return () => {
        clearInterval(pipeMove);
      };
    } else {
      setPipeLeft(1000 - pipeWidth);
    }
  });

  const handleStart = (e) => {
    setStartGame(true);
    e.target.style.opacity = 0;
  };

  return (
    <div className="screenGame" onClick={handleClick}>
      <div
        className="pipe"
        style={{
          top: 0,
          width: pipeWidth,
          height: pipeHeight,
          left: pipeLeft,
        }}
      ></div>
      <div className="start" onClick={handleStart}>
        Start !
      </div>
      <div className="bird" style={{ top: birdPosition }}></div>
      <div
        className="pipe"
        style={{
          bottom: 0,
          width: pipeWidth,
          height: bottomPipeHeight,
          left: pipeLeft,
        }}
      ></div>
    </div>
  );
};

export default Bird;
