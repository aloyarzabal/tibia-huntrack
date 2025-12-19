import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { SessionsView } from "./pages/sessions/SesssionsView";
import DashboardView from "./pages/dashboard/DashboardView";
import StatsView from "./pages/stats/StatsView";
import RaidsView from "./pages/raids/RaidsView";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} />
            <Route path="/sessions" element={<SessionsView />} />
            <Route path="/stats" element={<StatsView />} />
            <Route path="/raids" element={<RaidsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
