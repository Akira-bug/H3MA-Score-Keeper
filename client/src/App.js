import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Fencers from "./pages/Fencers";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Scoreboard from "./pages/ScoreBoard";
import "./style.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Scoreboard/>}/>
          <Route path="/fencers" element={<Fencers/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
