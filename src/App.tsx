import React from 'react';
import { useAppSelector } from "./app/hooks";
import { selectImagesLoaded } from "./features/board/boardSlice";
import { originalCardsArray } from "./constants";
import { Board } from "./features/board/Board";
import { Stats } from "./features/stats/Stats";
import { Loader } from "./features/loader/Loader";
import './App.css';

function App() {
  const imagesLoaded = useAppSelector(selectImagesLoaded);
  const allImagesLoaded = imagesLoaded === originalCardsArray.length * 2;

  return (
    <div className="App">
      <header>
        <h1>Memory game</h1>
      </header>
      <main className="main-container" style={{ display: allImagesLoaded ? 'block' : 'none' }}>
        <Board />
        <Stats />
      </main>
      {!allImagesLoaded && <Loader />}
    </div>
  );
}

export default App;
