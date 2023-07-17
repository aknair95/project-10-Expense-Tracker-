import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login/login";
import SignUp from "./components/pages/signUp/signUp";
import Home from "./components/pages/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
