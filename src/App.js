import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
