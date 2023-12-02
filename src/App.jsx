import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Consumption from "./pages/consumption/Consumption";
import Navigation from "./components/navigation/Navigation";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/consumption" element={<Consumption />} />
      </Routes>
    </Fragment>
  );
}

export default App;
