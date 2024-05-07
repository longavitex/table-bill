import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Tables from "./components/Tables/Tables";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <NavLink to={'/'}>
          <h3>Home</h3>
        </NavLink>
        <NavLink to={'/tables'}>
          <h3>Tables</h3>
        </NavLink>
        <Routes>
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
