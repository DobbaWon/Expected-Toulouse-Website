import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import History from './Pages/History/History';
import Fixtures from './Pages/Fixtures/Fixtures';
import Players from './Pages/Players/Players';
import ClubShop from './Pages/ClubShop/ClubShop';
import LeagueTable from './Pages/Fixtures/LeagueTable/LeagueTable';
import NextFixtures from './Pages/Fixtures/NextFixtures/NextFixtures';
import PreviousFixtures from './Pages/Fixtures/PreviousFixtures/PreviousFixtures';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ClubShop />} />
          <Route path="/history" element={<History />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/players" element={<Players />} />
          <Route path="/fixtures/league-table" element={<LeagueTable />} />
          <Route path="/fixtures/fixtures" element={<NextFixtures />} />
          <Route path="/fixtures/results" element={<PreviousFixtures />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;
