import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import DrugInfo from './DrugInfo';
import Recall from './Recall';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/druginfo" element={<DrugInfo />} />
        <Route path="/recall" element={<Recall />} />
      </Routes>
    </Router>
  );
};

export default App;