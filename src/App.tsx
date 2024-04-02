import React from 'react';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import MainPage from "./pages";
import './index.css'

function App() {
  return (
      <Router>
          <div>
              <Routes>
                <Route index path="/" element={<MainPage/>}></Route>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
