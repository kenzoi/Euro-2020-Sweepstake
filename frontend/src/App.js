import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Navbar from "./components/Navbar";
import Pool from "./components/Pool";
import PredictionList from "./components/PredictionList";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div className="app__container">
        <Navbar />
        <Switch>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/pool">
            <Pool />
          </Route>
          <Route path="/prediction">
            <PredictionList />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
