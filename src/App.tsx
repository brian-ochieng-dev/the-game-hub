import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "globalStyles";
import HomePage from "pages/home/HomePage";
import PageNotFound from "pages/error/PageNotFound";
import {
  MathGame,
  SnakeGame,
  TicTacToe,
  MineSweeper,
  TwentyFortyEight,
  MemoryGame,
  QuizGame,
} from "games";
import NavBar from "components/nav-bar/NavBar";
import themes from "themes/Themes.json";

const LINKS_TO = {
  homepage: "/",
  snakeGame: "/snake-game",
  memoryGame: "/memory-game",
  twentyFortyEight: "/2048",
  mathGame: "/math-game",
  ticTacToe: "/tic-tac-toe",
  mineSweeper: "/mine-sweeper",
  quizGame: "/quiz-game",
  PageNotFound: "*",
};

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeProvider
      theme={theme === "light" ? themes.lightTheme : themes.darkTheme}
    >
      <GlobalStyles />
      <BrowserRouter>
        <NavBar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path={LINKS_TO.mathGame} element={<MathGame />} />
          <Route path={LINKS_TO.homepage} element={<HomePage />} />
          <Route path={LINKS_TO.snakeGame} element={<SnakeGame />} />
          <Route path={LINKS_TO.memoryGame} element={<MemoryGame />} />
          <Route
            path={LINKS_TO.twentyFortyEight}
            element={<TwentyFortyEight />}
          />
          <Route path={LINKS_TO.ticTacToe} element={<TicTacToe />} />
          <Route path={LINKS_TO.mineSweeper} element={<MineSweeper />} />
          <Route path={LINKS_TO.quizGame} element={<QuizGame />} />
          <Route path={LINKS_TO.PageNotFound} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
