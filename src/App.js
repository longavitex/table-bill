import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Tables from "./components/Tables/Tables";
import { Provider } from 'react-redux';
import store from "./redux/store";
import Users from "./components/Users/Users";

function App() {
  return (
    <Provider store={store}>
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
          <NavLink to={'/users'}>
            <h3>Users</h3>
          </NavLink>
          <Routes>
            <Route path="/users" element={<Users />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
