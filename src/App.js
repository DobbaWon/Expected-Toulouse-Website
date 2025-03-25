import Footer from './Footer/Footer';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import History from './History/History';
import Fixtures from './Fixtures/Fixtures';
import Players from './Players/Players';
import ClubShop from './ClubShop/ClubShop';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ClubShop />} />
        <Route path="/history" element={<History />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/players" element={<Players />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
