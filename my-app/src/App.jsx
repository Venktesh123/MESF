import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import CreateMeme from "./pages/CreateMeme";
import Leaderboard from "./pages/Leaderboard";
import { useSocket } from "./hooks/useSocket";
import { setConnectedUsers } from "./store/slices/uiSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("user_count", (count) => {
        dispatch(setConnectedUsers(count));
      });

      socket.emit("user_join", {
        username: "cyberpunk420",
        userId: "cyberpunk420",
      });

      return () => {
        socket.off("user_count");
      };
    }
  }, [socket, dispatch]);

  return (
    <div className="App min-h-screen bg-dark-bg text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmYwMGZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateMeme />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
