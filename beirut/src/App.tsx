import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import MainPage from "./components/mainpage";
import Municipality from "./components/municipality";
import News from "./components/news";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/municipality" element={<Municipality/>}/>
        <Route path="/news" element={<News/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;