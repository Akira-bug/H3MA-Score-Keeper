import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Fencers from "./pages/Fencers";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Scoreboard from "./pages/ScoreBoard";
import MatchTracker from "./pages/MatchTracker";
import "./style.css"
import ViewMatches from "./pages/ViewMatches";
import UpdateMatch from "./pages/UpdateMatch";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MatchTracker/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/matchtracker" element={<MatchTracker/>}/>
          <Route path="/fencers" element={<Fencers/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/viewmatches" element={<ViewMatches/>}/>
          <Route path="/updatematch/:id" element={<UpdateMatch/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
