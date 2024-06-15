import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePages from "./pages/home/HomePages";
import VideoPages from "./pages/video/VideoPages";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<HomePages sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<VideoPages />} />
      </Routes>
    </div>
  );
};

export default App;
