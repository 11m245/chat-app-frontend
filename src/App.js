import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";

import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/user/SignupPage";
import { ForgotPage } from "./pages/user/ForgotPage";
import { LoginPage } from "./pages/user/LoginPage";
import { ToastContainer } from "react-toastify";
import { createContext } from "react";
import { ChatPage } from "./pages/user/ChatPage";
import { io } from "socket.io-client";
export const socket = io(process.env.REACT_APP_SERVER_API);

export const appContext = createContext();

function App() {
  const appContextObj = {};
  return (
    <div className="App">
      <ToastContainer theme="light" autoClose={3000} />
      <appContext.Provider value={appContextObj}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/user" element={<ChatPage />} />
        </Routes>
      </appContext.Provider>
    </div>
  );
}

export default App;
