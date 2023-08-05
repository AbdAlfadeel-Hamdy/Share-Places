import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/new" element={<NewPlace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
