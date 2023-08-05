import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/new" element={<NewPlace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
