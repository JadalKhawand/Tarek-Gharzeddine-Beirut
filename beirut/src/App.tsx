import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import MainPage from "./components/mainpage";
import Municipality from "./components/municipality";
import News from "./components/news";
import City from "./components/city";
import Projects from "./components/projects";
import Services from "./components/services";
import "./App.css";
import Reports from "./components/reports";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/municipality" element={<Municipality/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/city" element={<City/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/reports" element={<Reports/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;