import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import History from './Pages/History/History';
import Fixtures from './Pages/Fixtures/Fixtures';
import Players from './Pages/Players/Players';
import ClubShop from './Pages/ClubShop/ClubShop';

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
