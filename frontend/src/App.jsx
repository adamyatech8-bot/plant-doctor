import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Result from "./pages/Result";
import LibraryPage from "./pages/LibraryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;