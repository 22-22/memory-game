import React from 'react';
import { useAppSelector } from "./app/hooks";
import { selectImagesLoaded } from "./features/board/boardSlice";
import { originalCardsArray } from "./constants";
import { selectCards, selectMatchingCards } from "./features/board/boardSlice";
import { Board } from "./features/board/Board";
import { Stats } from "./features/stats/Stats";
import { Loader } from "./features/loader/Loader";
import { PlayAgainBtn } from "./features/play-again-btn/PlayAgainBtn";
import './App.css';

function App() {
  const cards = useAppSelector(selectCards);
  const matchingCards = useAppSelector(selectMatchingCards);
  const imagesLoaded = useAppSelector(selectImagesLoaded);
  const allImagesLoaded = imagesLoaded === originalCardsArray.length * 2;

  return (
    <div className="App">
      <header>
        <h1 className="header">Memory game</h1>
      </header>
      <main className="main-container" style={{ display: allImagesLoaded ? 'flex' : 'none' }}>
        <Stats />
        <Board />
        {matchingCards.length === cards.length &&
          <PlayAgainBtn />
        }
      </main>
      {!allImagesLoaded && <Loader />}
    </div>
  );
}

export default App;
