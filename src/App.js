import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r overflow-x-hidden from-slate-950 to-slate-900 text-slate-400 w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
